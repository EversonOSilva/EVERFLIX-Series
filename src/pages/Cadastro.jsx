import { Container, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SerieForm from '../components/SerieForm/SerieForm';
import { createSerie, updateSerie, getSerie } from '../services/api';

function Cadastro() {
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadSerie = async () => {
      try {
        if (location.state?.serie) {
          setEditando(location.state.serie);
        } else if (id) {
          const serieCarregada = await getSerie(id);
          setEditando(serieCarregada);
        } else {
          setEditando(null);
        }
      } catch (erro) {
        console.error('Erro ao carregar série para edição:', erro);
        setEditando(null);
      }
    };

    loadSerie();
  }, [location.state, id]);

  const handleSubmit = async (dados) => {
    if (!dados) {
      setEditando(null);
      return;
    }

    setLoading(true);
    try {
      if (editando) {
        await updateSerie(editando.id, dados);
        setMensagem("Série atualizada com sucesso!");
      } else {
        await createSerie(dados);
        setMensagem("Série cadastrada com sucesso!");
      }
      setEditando(null);
      // Limpar estado da navegação
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => {
        setMensagem("");
      }, 5000);
      // Redirecionar para a lista após salvar/atualizar
      navigate('/lista');
    } catch (erro) {
      setMensagem("Erro ao salvar série: " + erro.message);
      console.error(erro);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditando(null);
    setMensagem("");
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary" align="center">
        Cadastro de Série
      </Typography>
      
      {mensagem && (
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 2, 
            p: 2, 
            textAlign: 'center',
            bgcolor: mensagem.includes("sucesso") ? '#c8e6c9' : '#ffcdd2',
            borderRadius: 1,
            color: mensagem.includes("sucesso") ? '#2e7d32' : '#c62828'
          }}
        >
          {mensagem}
        </Typography>
      )}

      <Box sx={{ mt: 2 }}>
        <SerieForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          editando={editando}
          loading={loading}
        />
      </Box>
    </Container>
  );
}

export default Cadastro;