import { Container, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SerieList from '../components/SerieList/SerieList';
import { getSeries, deleteSerie } from '../services/api';
import db from '../../db.json';

function Lista() {
  const [series, setSeries] = useState(db.series || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarSeries();
  }, []);

  const carregarSeries = async () => {
    setLoading(true);
    setError(null);

    try {
      const dados = await getSeries();
      setSeries(dados);
    } catch (erro) {
      console.error('Erro ao carregar séries:', erro);
      setError('Não foi possível carregar as séries. Verifique se o JSON Server está rodando na porta 3001.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir esta série?')) {
      try {
        await deleteSerie(id);
        setSeries(series.filter(s => s.id !== id));
      } catch (erro) {
        console.error('Erro ao excluir série:', erro);
      }
    }
  };

  const handleEdit = (serie) => {
    navigate(`/cadastro/${serie.id}`, { state: { serie } });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary" align="center">
          Carregando séries...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary" align="center">
        Catálogo de Séries
      </Typography>
      {error && (
        <Typography variant="body1" color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Typography
        variant="subtitle1"
        align="center"
        sx={{
          mb: 2,
          color: '#fff',
          bgcolor: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 1,
          py: 1,
          px: 2
        }}
      >
        Total de séries cadastradas: {series.length}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <SerieList series={series} onDelete={handleDelete} onEdit={handleEdit} />
      </Box>
    </Container>
  );
}

export default Lista;