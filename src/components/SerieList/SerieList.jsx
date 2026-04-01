import { Button, Card, CardContent, Typography, Box, Grid } from "@mui/material";
import dayjs from 'dayjs';

function SerieList({ series, onDelete, onEdit }) {
  if (!series || series.length === 0) {
    return (
      <Box sx={{ maxWidth: 800, margin: "20px auto", textAlign: "center", py: 4 }}>
        <Typography variant="h5" color="text.secondary">
          Nenhuma série cadastrada ainda. Vá para Cadastro e adicione uma!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "20px auto" }}>
      <Typography variant="h4" component="h3" gutterBottom align="center">
        ==================================
      </Typography>

      <Grid container spacing={2}>
        {series.map((s) => (
          <Grid item xs={12} sm={6} md={4} key={s.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {s.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Categoria: {s.categoria}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Autor: {s.autor || 'Não informado'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Temporadas: {s.temporadas || 'N/D'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lançamento: {s.lancamento || 'N/D'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data em que assistiu: {s.assistidoEm ? dayjs(s.assistidoEm).format('DD/MM/YYYY') : 'N/D'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Sinopse: {s.sinopse || 'N/D'}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => onEdit(s)}
                  sx={{ mr: 1 }}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => onDelete(s.id)}
                >
                  Excluir
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SerieList;