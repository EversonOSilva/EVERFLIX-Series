import { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function SerieForm({ onSubmit, onCancel, editando, loading = false }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  const [temporadas, setTemporadas] = useState("");
  const [lancamento, setLancamento] = useState(null);
  const [assistidoEm, setAssistidoEm] = useState(null);
  const [sinopse, setSinopse] = useState("");
  const [erro, setErro] = useState("");

  const resetForm = () => {
    setTitulo("");
    setCategoria("");
    setAutor("");
    setTemporadas("");
    setLancamento(null);
    setAssistidoEm(null);
    setSinopse("");
    setErro("");
  };

  useEffect(() => {
    if (editando) {
      setTitulo(editando.titulo || "");
      setCategoria(editando.categoria || "");
      setAutor(editando.autor || "");
      setTemporadas(String(editando.temporadas || ""));
      setLancamento(editando.lancamento ? dayjs(editando.lancamento) : null);
      setAssistidoEm(editando.assistidoEm ? dayjs(editando.assistidoEm) : null);
      setSinopse(editando.sinopse || "");
      setErro("");
    } else {
      resetForm();
    }
  }, [editando]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !categoria || !autor || !temporadas || !lancamento || !assistidoEm || !sinopse.trim()) {
      setErro("Preencha todos os campos!");
      return;
    }

    onSubmit({
      id: editando?.id,
      titulo,
      categoria,
      autor,
      temporadas: Number(temporadas),
      lancamento: lancamento.format('YYYY'),
      assistidoEm: assistidoEm.format('YYYY-MM-DD'),
      sinopse: sinopse.trim()
    });

    resetForm();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ maxWidth: 400, margin: "20px auto", padding: 3 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          {editando ? "Editar Série" : "Adicionar Série"}
        </Typography>

        {erro && (
          <Typography color="error" sx={{ mb: 2 }}>
            {erro}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Título"
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            fullWidth
            required
            disabled={loading}
            sx={{ bgcolor: 'grey', borderRadius: 1 }}
          />

          <TextField
            label="Categoria"
            variant="outlined"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            fullWidth
            required
            disabled={loading}
            sx={{ bgcolor: 'grey', borderRadius: 1 }}
          />

          <TextField
            label="Autor"
            variant="outlined"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            fullWidth
            required
            disabled={loading}
            sx={{ bgcolor: 'grey', borderRadius: 1 }}
          />

          <FormControl fullWidth>
            <InputLabel>Número de Temporadas</InputLabel>
            <Select
              value={temporadas}
              label="Número de Temporadas"
              onChange={(e) => setTemporadas(e.target.value)}
              required
              disabled={loading}
              sx={{ bgcolor: 'grey', borderRadius: 1 }}
            >
              <MenuItem value="">
                <em>Selecione...</em>
              </MenuItem>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                <MenuItem key={num} value={num.toString()}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            label="Ano de Lançamento"
            views={['year']}
            value={lancamento}
            onChange={(newValue) => setLancamento(newValue)}
            disabled={loading}
            slotProps={{ textField: { fullWidth: true, required: true, sx: { bgcolor: 'grey', borderRadius: 1 } } }}
          />

          <DatePicker
            label="Data em que assistiu"
            value={assistidoEm}
            onChange={(newValue) => setAssistidoEm(newValue)}
            disabled={loading}
            slotProps={{ textField: { fullWidth: true, required: true, sx: { bgcolor: 'grey', borderRadius: 1 } } }}
          />

          <TextField
            label="Sinopse"            
            variant="outlined"
            multiline
            rows={4}
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
            fullWidth
            required
            disabled={loading}
            sx={{ bgcolor: 'grey', borderRadius: 1 }}
          />

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
            {editando && (
              <Button type="button" variant="outlined" onClick={() => onCancel?.()} disabled={loading}>
                Cancelar
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}

export default SerieForm;