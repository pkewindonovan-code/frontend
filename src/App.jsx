import { useState } from 'react';
import { Boxes, Tags, Users, Truck } from 'lucide-react';
import CrudPage from './components/CrudPage.jsx';
import { entities } from './entities.js';

const menu = [
  { key: 'categorias', label: 'Categoría', icon: Tags },
  { key: 'productos', label: 'Producto', icon: Boxes },
  { key: 'clientes', label: 'Cliente', icon: Users },
  { key: 'proveedores', label: 'Proveedor', icon: Truck }
];

export default function App() {
  const [active, setActive] = useState('categorias');
  const ActiveIcon = menu.find((item) => item.key === active)?.icon || Tags;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><ActiveIcon size={26} /></div>
          <div>
            <h1>Sistema CRUD</h1>
            <p>React + Node + Supabase</p>
          </div>
        </div>

        <nav>
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className={active === item.key ? 'active' : ''}
                onClick={() => setActive(item.key)}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main>
        <CrudPage config={entities[active]} />
      </main>
    </div>
  );
}
