import api from "services/api";
import axios from "axios";

import { alertDispatch } from "store/dispatchs/dispatchs";
import {
  FormatOptions,
  FormatOptionsState,
  FormatOptionsCity,
  ValidateEmail,
} from "functions/utils";

export const getState = async (setOptionsState, setLoading) => {
  try {
    const response = await api.get(`/state`);
    setOptionsState(FormatOptionsState(response.data.data));
  } catch (error) {
    alertDispatch("error", error?.response?.data?.message);
  } finally {
    if (setLoading != undefined) setLoading(false);
  }
};

export const getCity = async (setOptionsCity, setLoading, idState) => {
  try {
    const response = await api.get(`/city`, {
      params: {
        idState,
      },
    });
    setOptionsCity(FormatOptionsCity(response.data.data));
  } catch (error) {
    alertDispatch("error", error?.response?.data?.message);
  } finally {
    if (setLoading != undefined) setLoading(false);
  }
};

export const getAddress = async (
  cep,
  setAddress,
  setDisctric,
  setComplement,
  setIdState,
  setIdCity,
  optionsState,
  optionsCity
) => {
  cep = cep.replace(/\D/g, "");
  if (cep.length < 8) return false;
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

    if (response.data.erro) {
      alertDispatch("error", "Não foi possível consultar esse cep");
    }

    setAddress(response.data.logradouro);
    setDisctric(response.data.bairro);
    setComplement(response.data.complemento);

    //State
    for (var i = 0; i < optionsState.length; i++) {
      if (optionsState[i].uf == response.data.uf) {
        setIdState(optionsState[i].id);
        break;
      }
    }

    //City
    for (var i = 0; i < optionsCity.length; i++) {
      if (optionsCity[i].ibge == parseInt(response.data.ibge)) {
        setIdCity(optionsCity[i].id);
        break;
      }
    }
  } catch (error) {
    alertDispatch("error", "Não foi possível consultar esse cep");
  }
};

export const verifyEmail = async (email, setEmail, prevEmail, setLoading) => {
  if (email == "") return false;
  if (email == prevEmail) return false;

  if (!ValidateEmail(email)) {
    alertDispatch("error", "E-mail inválido");
    setEmail("");
    return false;
  }

  try {
    const response = await api.get(`/verify-email/${email}`);
    if (response.data.hasRegister) {
      setEmail("");
      alertDispatch("error", `Esse e-mail já está cadastrado no sistema`);
    }
  } catch (error) {
    alertDispatch("error", error?.response?.data?.message);
  } finally {
    if (setLoading != undefined) setLoading(false);
  }
};

export const getTypes = async (setOptionsTypes, setLoading) => {
  try {
    const response = await api.get(`/project-types`);
    setOptionsTypes(FormatOptions(response.data.data));
  } catch (error) {
    alertDispatch("error", error?.response?.data?.message);
  } finally {
    if (setLoading != undefined) setLoading(false);
  }
};
