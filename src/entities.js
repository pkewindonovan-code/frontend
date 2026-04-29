export const entities = {
  categorias: {
    title: 'Categorías',
    idField: 'id_categoria',
    endpoint: 'categorias',
    fields: [
      { name: 'descripcion', label: 'Descripción', type: 'text' }
    ]
  },
  productos: {
    title: 'Productos',
    idField: 'id_producto',
    endpoint: 'productos',
    fields: [
      { name: 'descripcion', label: 'Descripción', type: 'text' },
      { name: 'precio', label: 'Precio', type: 'number' },
      { name: 'stock', label: 'Stock', type: 'number' },
      { name: 'id_categoria', label: 'ID Categoría', type: 'number' },
      { name: 'id_proveedor', label: 'ID Proveedor', type: 'number' }
    ]
  },
  clientes: {
    title: 'Clientes',
    idField: 'id_cliente',
    endpoint: 'clientes',
    fields: [
      { name: 'nombres', label: 'Nombres', type: 'text' },
      { name: 'apellidos', label: 'Apellidos', type: 'text' },
      { name: 'direccion', label: 'Dirección', type: 'text' },
      { name: 'telefono', label: 'Teléfono', type: 'text' }
    ]
  },
  proveedores: {
    title: 'Proveedores',
    idField: 'id_proveedor',
    endpoint: 'proveedores',
    fields: [
      { name: 'razonsocial', label: 'Razón social', type: 'text' },
      { name: 'direccion', label: 'Dirección', type: 'text' },
      { name: 'telefono', label: 'Teléfono', type: 'text' }
    ]
  }
};
