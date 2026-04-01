import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button, Stack } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3, bgcolor: 'rgba(20, 20, 20, 0.84)' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          EVERFLIX Séries
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 2 }}>
          Gerencie sua coleção de séries em uma API "serieJournal-api" fornecida pelo curso, completa.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='center' sx={{ mb: 3 }}>
          <Button variant='contained' color='primary' component={RouterLink} to='/lista'>Ver Lista</Button>
          <Button variant='outlined' color='primary' component={RouterLink} to='/cadastro'>Cadastrar</Button>
          <Button variant='outlined' color='secondary' component={RouterLink} to='/sobre'>Sobre</Button>
        </Stack>

        <Box sx={{ textAlign: 'left', color: '#fff', lineHeight: 1.6 }}>
          <Typography variant="body1" paragraph>
            Esta aplicação permite criar, listar, editar e excluir séries usando um serviço backend em Node.js/Express.
            A integração acontece por meio de requisições HTTP com o Axios para o endpoint <strong>http://localhost:5000/series</strong>.
          </Typography>

          <Typography variant="body1" paragraph>
            Funcionalidades principais:
            <ul>
              <li>Listar todas as séries</li>
              <li>Visualizar detalhes por ID</li>
              <li>Cadastrar nova série</li>
              <li>Editar série existente</li>
              <li>Excluir série</li>
            </ul>
          </Typography>

          <Typography variant="body1" paragraph>
            Modo offline: se a API cair, o sistema utiliza fallback de localStorage e dados do <code>db.json</code> para manter a experiência de usuário.
          </Typography>

          <Typography variant="body1" paragraph>
            Tecnologias usadas: React, Vite, Material-UI, React Router, Axios, Day.js, Express, CORS e Node.js.
          </Typography>
          <Typography variant="body0" paragraph>
            <h2>Gostaria de explicitar aqui que como não tenho muita experiência com os conteúdos da disciplina, utilizei auxilido da IA que integra o Visual Studio Code para me auxiliar no desenvolvimento.</h2>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;