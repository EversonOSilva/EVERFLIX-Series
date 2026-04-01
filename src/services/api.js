import axios from 'axios';
import db from '../../db.json';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

const STORAGE_KEY = 'everflix_series';

const getLocalSeries = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Não foi possível ler séries do localStorage:', error);
    return [];
  }
};

const setLocalSeries = (series) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(series));
  } catch (error) {
    console.warn('Não foi possível salvar séries no localStorage:', error);
  }
};

export const getSeries = async () => {
  const local = getLocalSeries();

  try {
    const response = await api.get('/series');
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
    // Se o servidor responder com array vazio, usar localStorage ou db.json
    if (local.length > 0) {
      return local;
    }
    return db.series || [];
  } catch (erro) {
    console.error('Erro ao buscar séries no servidor, usando localStorage/db.json local:', erro);
    if (local.length > 0) {
      return local;
    }
    return db.series || [];
  }
};

export const getSerie = async (id) => {
  try {
    const response = await api.get(`/series/${id}`);
    return response.data;
  } catch (erro) {
    console.warn('Erro ao buscar série no servidor, buscando em localStorage/db.json:', erro);

    const local = getLocalSeries();
    const found = local.find((serie) => String(serie.id) === String(id));
    if (found) return found;

    const fallback = (db.series || []).find((serie) => String(serie.id) === String(id));
    if (fallback) return fallback;

    throw erro;
  }
};

export const createSerie = async (serie) => {
  try {
    const response = await api.post('/series', serie);
    return response.data;
  } catch (erro) {
    console.warn('Erro ao criar série no servidor, salvando no localStorage:', erro);
    const local = getLocalSeries();
    const generatedId = Date.now();
    const novaSerie = { ...serie, id: generatedId };
    const updated = [...local, novaSerie];
    setLocalSeries(updated);
    return novaSerie;
  }
};

const mergeLocalAndDbSeries = () => {
  const local = getLocalSeries();
  const dbSeries = db.series || [];

  const seriesMap = new Map();

  dbSeries.forEach((serie) => {
    seriesMap.set(String(serie.id), serie);
  });

  local.forEach((serie) => {
    seriesMap.set(String(serie.id), serie);
  });

  return Array.from(seriesMap.values());
};

export const updateSerie = async (id, serie) => {
  try {
    const response = await api.put(`/series/${id}`, serie);
    return response.data;
  } catch (erro) {
    console.warn('Erro ao atualizar série no servidor, atualizando no localStorage:', erro);
    const merged = mergeLocalAndDbSeries();
    const updated = merged.map((item) =>
      String(item.id) === String(id) ? { ...item, ...serie, id: item.id } : item
    );
    setLocalSeries(updated);
    return { id, ...serie };
  }
};

export const deleteSerie = async (id) => {
  try {
    const response = await api.delete(`/series/${id}`);
    return response.data;
  } catch (erro) {
    console.warn('Erro ao deletar série no servidor, removendo do localStorage:', erro);
    const merged = mergeLocalAndDbSeries();
    const updated = merged.filter((item) => String(item.id) !== String(id));
    setLocalSeries(updated);
    return { id };
  }
};

export default api;