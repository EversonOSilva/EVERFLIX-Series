import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Divider, Chip, Stack } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import ApiIcon from '@mui/icons-material/Api';
import InfoIcon from '@mui/icons-material/Info';

function Sobre() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary" align="center">
          SerieJournal - Sobre
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ textAlign: 'center', mt: 3 }}>
          Aplicação web completa para gerenciamento e catalogação de séries de TV. 
          Permite cadastrar, listar, editar e excluir suas séries favoritas com persistência em banco de dados.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Arquitetura */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ApiIcon color="primary" /> Arquitetura
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary" sx={{ mb: 2 }}>
          A aplicação utiliza arquitetura cliente-servidor com separação clara de responsabilidades:
        </Typography>
        <Box sx={{ bgcolor: 'rgba(0,0,0,0.1)', p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 1 }}>
            <strong>Frontend:</strong> http://localhost:5174 (Vite + React)
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace' }}>
            <strong>Backend:</strong> http://localhost:5000 (Express + Node.js)
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Endpoints da API */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StorageIcon color="primary" /> Endpoints Disponíveis
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary" sx={{ mb: 2 }}>
          A API "serieJournal-api" implementa operações CRUD completas para gerenciar séries:
        </Typography>
        
        <Box sx={{ bgcolor: 'rgba(0,0,0,0.1)', p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 1 }}>
            <Chip label="GET" size="small" color="primary" variant="outlined" sx={{ mr: 1 }} />
            <code>/series</code> - Lista todas as séries
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 1 }}>
            <Chip label="GET" size="small" color="primary" variant="outlined" sx={{ mr: 1 }} />
            <code>/series/:id</code> - Retorna série por ID
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 1 }}>
            <Chip label="POST" size="small" color="success" variant="outlined" sx={{ mr: 1 }} />
            <code>/series</code> - Cria nova série
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 1 }}>
            <Chip label="PUT" size="small" color="warning" variant="outlined" sx={{ mr: 1 }} />
            <code>/series</code> - Atualiza série existente
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace' }}>
            <Chip label="DELETE" size="small" color="error" variant="outlined" sx={{ mr: 1 }} />
            <code>/series/:id</code> - Remove série por ID
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Tecnologias */}
        <Typography variant="h5" component="h2" gutterBottom>
          Tecnologias Utilizadas
        </Typography>
        
        <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
          Frontend
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="React 18" 
              secondary="Biblioteca JavaScript para construção de interfaces reativas" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Vite" 
              secondary="Build tool moderno com hot reload para desenvolvimento rápido" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Material-UI (MUI)" 
              secondary="Biblioteca de componentes React com design Material Design" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="React Router DOM v6" 
              secondary="Roteamento de cliente para navegação entre páginas" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Axios" 
              secondary="Cliente HTTP para requisições à API" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Day.js" 
              secondary="Biblioteca leve para manipulação de datas e formatação" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="@mui/x-date-pickers" 
              secondary="Componentes MUI para seleção de datas" 
            />
          </ListItem>
        </List>

        <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
          Backend
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Node.js" 
              secondary="Runtime JavaScript para execução no servidor" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Express" 
              secondary="Framework web minimalista para construção de APIs REST" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="CORS" 
              secondary="Middleware para permitir requisições cross-origin" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Nodemon" 
              secondary="Ferramenta para auto-restart do servidor em desenvolvimento" 
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        {/* Model de Dados */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon color="primary" /> Modelo de Dados
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary" sx={{ mb: 2 }}>
          Cada série armazenada contém os seguintes campos:
        </Typography>
        
        <Box sx={{ bgcolor: 'rgba(0,0,0,0.1)', p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
            <strong>id</strong>: number - Identificador único
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
            <strong>titulo</strong>: string - Nome da série
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
            <strong>categoria</strong>: string - Gênero/tipo (Drama, Ficção Científica, etc)
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
            <strong>autor</strong>: string - Criador/produtor da série
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
            <strong>temporadas</strong>: number - Número de temporadas
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
            <strong>lancamento</strong>: string - Ano de lançamento (YYYY)
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
            <strong>assistidoEm</strong>: string - Data quando foi assistida (YYYY-MM-DD)
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace' }}>
            <strong>sinopse</strong>: string - Descrição/resumo da série
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Funcionalidades */}
        <Typography variant="h5" component="h2" gutterBottom>
          Funcionalidades
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label="✓ Listar todas as séries" color="success" variant="outlined" />
          <Chip label="✓ Visualizar série individual" color="success" variant="outlined" />
          <Chip label="✓ Cadastrar nova série" color="success" variant="outlined" />
          <Chip label="✓ Editar série existente" color="success" variant="outlined" />
          <Chip label="✓ Deletar série" color="success" variant="outlined" />
          <Chip label="✓ Validação de formulários" color="success" variant="outlined" />
          <Chip label="✓ Seletor de datas" color="success" variant="outlined" />
          <Chip label="✓ Persistência de dados" color="success" variant="outlined" />
        </Stack>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
          <Typography variant="body2" color="primary.dark">
            <strong>💡 Nota:</strong> Os dados são persistidos em arquivo JSON no backend. 
            Quando você adiciona, edita ou exclui uma série, as alterações são salvas imediatamente no servidor.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Sobre;