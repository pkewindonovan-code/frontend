import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';

function emptyForm(fields) {
  return fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
}

export default function CrudPage({ config }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm(config.fields));
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    const text = search.toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(text));
  }, [items, search]);

  async function loadData() {
    setLoading(true);
    try {
      const data = await api.list(config.endpoint);
      setItems(data);
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setForm(emptyForm(config.fields));
    setEditingId(null);
    setSearch('');
    loadData();
  }, [config.endpoint]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const payload = { ...form };
      for (const field of config.fields) {
        if (field.type === 'number' && payload[field.name] !== '') payload[field.name] = Number(payload[field.name]);
      }
      if (editingId) {
        await api.update(config.endpoint, editingId, payload);
        setMessage('Registro actualizado correctamente');
      } else {
        await api.create(config.endpoint, payload);
        setMessage('Registro guardado correctamente');
      }
      setForm(emptyForm(config.fields));
      setEditingId(null);
      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleEdit(item) {
    const newForm = emptyForm(config.fields);
    for (const field of config.fields) newForm[field.name] = item[field.name] ?? '';
    setForm(newForm);
    setEditingId(item[config.idField]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    const ok = confirm('¿Seguro que deseas eliminar este registro?');
    if (!ok) return;
    try {
      await api.remove(config.endpoint, id);
      setMessage('Registro eliminado correctamente');
      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="crud-card">
      <div className="crud-header">
        <div>
          <p className="eyebrow">Módulo CRUD</p>
          <h2>{config.title}</h2>
        </div>
        <input
          className="search"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {message && <div className="alert">{message}</div>}

      <form className="form-grid" onSubmit={handleSubmit}>
        {config.fields.map((field) => (
          <label key={field.name}>
            {field.label}
            <input
              required
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
            />
          </label>
        ))}
        <div className="form-actions">
          <button type="submit">{editingId ? 'Actualizar' : 'Guardar'}</button>
          {editingId && (
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm(config.fields));
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="table-wrap">
        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                {config.fields.map((field) => <th key={field.name}>{field.label}</th>)}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item[config.idField]}>
                  <td>{item[config.idField]}</td>
                  {config.fields.map((field) => <td key={field.name}>{item[field.name]}</td>)}
                  <td className="actions">
                    <button className="small" onClick={() => handleEdit(item)}>Editar</button>
                    <button className="small danger" onClick={() => handleDelete(item[config.idField])}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={config.fields.length + 2}>No hay registros.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
