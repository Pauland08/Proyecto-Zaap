// Datos de la base de datos (simulados)
const data = {
    usuarios: [
      { id_usuario: 1, nombre_usuario: 'admin', correo: 'admin@email.com', rol: 'Administrador', estado: 'Activo' },
      { id_usuario: 2, nombre_usuario: 'fundacion_ikigai', correo: 'ikigai@gmail.com', rol: 'Fundación', estado: 'Activo' },
      { id_usuario: 3, nombre_usuario: 'voluntario_juan', correo: 'juan@gmail.com', rol: 'Voluntario', estado: 'Activo' },
      { id_usuario: 4, nombre_usuario: 'donante_ana', correo: 'ana@gmail.com', rol: 'Donante', estado: 'Activo' },
      { id_usuario: 5, nombre_usuario: 'ciudadano_david', correo: 'david@gmail.com', rol: 'Ciudadano', estado: 'Activo' },
      { id_usuario: 6, nombre_usuario: 'voluntario_maria', correo: 'maria@gmail.com', rol: 'Voluntario', estado: 'Activo' },
      { id_usuario: 7, nombre_usuario: 'voluntario_carlos', correo: 'carlos@gmail.com', rol: 'Voluntario', estado: 'Activo' },
      { id_usuario: 8, nombre_usuario: 'donante_laura', correo: 'laura@gmail.com', rol: 'Donante', estado: 'Activo' },
      { id_usuario: 9, nombre_usuario: 'donante_pedro', correo: 'pedro@gmail.com', rol: 'Donante', estado: 'Activo' },
    ],
    fundaciones: [
      { id_fundacion: 101, id_usuario: 2, nombre_fundacion: 'Fundación ikigai', ubicacion: 'Bogotá', descripcion: 'Rescate y adopción de animales', contacto: '321 0456789', estado_validacion: 'Validada' },
    ],
    animales: [
      { id_animal: 201, id_fundacion: 101, nombre: 'Tambo', especie: 'Perro', edad_aprox: '3 años', estado_medico: 'En buen estado', descripcion: 'Perro amigable y juguetón. Rescatado de un parque, necesita un hogar amoroso. Es ideal para familias con niños.', ubicacion: 'Bogotá', fotos: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg', estado: 'disponible' },
      { id_animal: 202, id_fundacion: 101, nombre: 'Mishi', especie: 'Gato', edad_aprox: '1 año', estado_medico: 'Vacunas al día', descripcion: 'Gatito curioso y muy tranquilo. Perfecto para apartamentos, le encanta dormir en el sol y jugar con hilos.', ubicacion: 'Bogotá', fotos: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg', estado: 'adoptado' },
      { id_animal: 203, id_fundacion: 101, nombre: 'Bunny', especie: 'Conejo', edad_aprox: '6 meses', estado_medico: 'En recuperación', descripcion: 'Conejo rescatado de una granja, es muy dócil y se lleva bien con otros animales. Le encanta comer zanahorias y saltar en el jardín.', ubicacion: 'Bogotá', fotos: 'https://cdn.pixabay.com/photo/2017/04/05/13/46/rabbit-2204599_1280.jpg', estado: 'disponible' },
      { id_animal: 204, id_fundacion: 101, nombre: 'Roco', especie: 'Perro', edad_aprox: '5 años', estado_medico: 'Ciego de un ojo', descripcion: 'Perro con una historia difícil, pero con un corazón gigante. Busca una familia que le brinde paciencia y mucho amor.', ubicacion: 'Bogotá', fotos: 'https://cdn.pixabay.com/photo/2018/03/31/06/31/dog-3277416_1280.jpg', estado: 'deshabilitado' },
    ],
    rescates: [
      { id_rescate: 301, id_usuario: 5, descripcion: 'Gato en árbol', fotos: 'gato_arbol.jpg', fecha: '2025-08-20', ubicacion: 'Calle 100', estado: 'en_proceso' },
    ],
    adopciones: [
      { id_solicitud: 601, id_usuario: 4, id_animal: 201, fecha_solicitud: '2025-08-28', mensaje: 'Estoy interesado en adoptar a Tambo.', estado: 'pendiente' },
    ],
    voluntariado: [
      { id_postulacion: 701, id_usuario: 3, id_evento: 801, fecha_postulacion: '2025-08-25', estado: 'aceptada', observaciones: 'Apoyar en el registro de asistentes y la organización del espacio.' },
      { id_postulacion: 702, id_usuario: 6, id_evento: 801, fecha_postulacion: '2025-08-28', estado: 'pendiente', observaciones: 'Pendiente de confirmación. Puede apoyar con la difusión en redes sociales.' },
      { id_postulacion: 703, id_usuario: 7, id_evento: 802, fecha_postulacion: '2025-09-01', estado: 'deshabilitado', observaciones: 'Se deshabilitó por falta de cupo.' },
    ],
    donaciones: [
      { id_donacion: 401, id_usuario: 4, titulo: 'Alimentos para animales', monto: 500000, comprobante: 'comp401.jpg', fecha: '2025-08-01', id_fundacion: 101, metodo_pago: 'Tarjeta de crédito', estado: 'aceptada' },
      { id_donacion: 402, id_usuario: 8, titulo: 'Medicina para Tambo', monto: 150000, comprobante: 'comp402.jpg', fecha: '2025-08-10', id_fundacion: 101, metodo_pago: 'Transferencia bancaria', estado: 'pendiente' },
      { id_donacion: 403, id_usuario: 9, titulo: 'Ayuda para refugios', monto: 1000000, comprobante: 'comp403.jpg', fecha: '2025-08-15', id_fundacion: 101, metodo_pago: 'PayPal', estado: 'deshabilitada' }
    ],
    campañas: [
      { id_campana: 901, id_fundacion: 101, titulo: 'Campaña de Alimentos', descripcion: 'Recolección de alimentos secos para perros y gatos en refugios de Bogotá.', meta: '500kg', fotos: 'https://cdn.pixabay.com/photo/2016/06/18/17/42/animal-1465223_1280.jpg', fecha_inicio: '2025-09-01', fecha_fin: '2025-09-30', tipo: 'donacion', estado: 'activa' },
      { id_campana: 902, id_fundacion: 101, titulo: 'Jornada de Vacunación', descripcion: 'Jornada gratuita de vacunación antirrábica y desparasitación para mascotas.', meta: '150 vacunas', fotos: 'https://cdn.pixabay.com/photo/2016/09/06/07/20/dog-1649348_1280.jpg', fecha_inicio: '2025-10-10', fecha_fin: '2025-10-12', tipo: 'voluntariado', estado: 'activa' },
      { id_campana: 903, id_fundacion: 101, titulo: 'Ayuda para Refugios', descripcion: 'Campaña para recaudar fondos y suministros médicos para refugios afectados por lluvias.', meta: '$2.000.000', fotos: 'https://cdn.pixabay.com/photo/2017/08/17/04/18/shelter-2650005_1280.jpg', fecha_inicio: '2025-08-15', fecha_fin: '2025-08-30', tipo: 'donacion', estado: 'deshabilitada' },
    ],
    eventos: [
      { id_evento: 801, id_fundacion: 101, titulo: 'Jornada de Adopción', fecha_evento: '2025-09-01', ubicacion: 'Parque de la 93', tipo: 'adopción', estado: 'activo' },
      { id_evento: 802, id_fundacion: 101, titulo: 'Feria Canina', fecha_evento: '2025-10-05', ubicacion: 'Parque de los Hippies', tipo: 'feria', estado: 'activo' },
    ],
    reportes: [
      { id_reporte: 1, titulo: 'Reporte de Donaciones (Agosto)', tipo: 'donaciones', fecha_generacion: '2025-08-31', fecha_inicio: '2025-08-01', fecha_fin: '2025-08-31', estado: 'activo', locked: true }
    ]
  };
  
  let lastId = { usuarios: 9, animales: 204, campañas: 903, voluntariado: 703, donaciones: 403, reportes: 1 };
  
  // --- LOGIN ---
  document.getElementById('login-button').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (username === 'admin' && password === 'Admin123') {
      document.getElementById('login-screen').classList.add('hidden');
      document.getElementById('admin-panel').classList.remove('hidden');
      document.getElementById('admin-name').innerText = username;
      mostrarSeccion('reportes');
    } else {
      alert('Credenciales incorrectas');
    }
  });
  
  // --- NAVEGACIÓN ---
  function ocultarSecciones() {
    document.querySelectorAll('.sección').forEach(section => {
      section.classList.add('hidden');
    });
  }
  
  function mostrarSeccion(section) {
    ocultarSecciones();
    document.getElementById(section).classList.remove('hidden');
  
    // Limpiar contenido previo de la sección
    const reporteContenido = document.getElementById('reporte-contenido');
    if (reporteContenido) {
      reporteContenido.innerHTML = '<p>Selecciona un reporte para visualizar los datos.</p>';
    }
    const btnExportarPDF = document.getElementById('btn-exportar-pdf');
    const btnExportarExcel = document.getElementById('btn-exportar-excel');
    if (btnExportarPDF && btnExportarExcel) {
      btnExportarPDF.classList.add('hidden');
      btnExportarExcel.classList.add('hidden');
    }
  
    if (section === 'animales') {
      renderizarAnimales();
      return;
    }
    
    if (section === 'campañas') {
      renderizarCampañas();
      return;
    }
    
    const tabla = document.getElementById(`tbl-${section}`);
    const thead = tabla.querySelector('thead');
    const tbody = tabla.querySelector('tbody');
  
    if (secciones[section].headers.length) {
      thead.innerHTML = `<tr>${secciones[section].headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    } else {
      thead.innerHTML = '';
    }
  
    tbody.innerHTML = '';
    data[section].forEach(item => {
      const row = document.createElement('tr');
      
      // Obtener datos relacionados para mostrar en la tabla
      const usuario = data.usuarios.find(u => u.id_usuario === item.id_usuario);
      const evento = data.eventos.find(e => e.id_evento === item.id_evento);
      const fundacion = data.fundaciones.find(f => f.id_fundacion === item.id_fundacion);
      
      const columnsToDisplay = secciones[section].columns.map(col => {
        if (col === 'nombre_usuario') return usuario ? usuario.nombre_usuario : 'N/A';
        if (col === 'correo_usuario') return usuario ? usuario.correo : 'N/A';
        if (col === 'nombre_evento') return evento ? evento.titulo : 'N/A';
        if (col === 'fecha_evento') return evento ? evento.fecha_evento : 'N/A';
        if (col === 'nombre_fundacion') return fundacion ? fundacion.nombre_fundacion : 'N/A';
        if (col === 'ver_reporte') return `<button onclick="verReporte(${item.id_reporte})">Ver</button>`;
        return item[col];
      });
  
      columnsToDisplay.forEach(value => {
        row.innerHTML += `<td>${value}</td>`;
      });
  
      const actionsCell = document.createElement('td');
      secciones[section].acciones.forEach(action => {
        const btn = document.createElement('button');
        btn.textContent = action.charAt(0).toUpperCase() + action.slice(1);
        btn.onclick = () => window[action](section, item[secciones[section].columns[0]]);
        actionsCell.appendChild(btn);
      });
      row.appendChild(actionsCell);
      tbody.appendChild(row);
    });
  }
  
  const secciones = {
    usuarios: {
      headers: ['ID', 'Nombre', 'Correo', 'Rol', 'Estado', 'Acciones'],
      columns: ['id_usuario', 'nombre_usuario', 'correo', 'rol', 'estado'],
      acciones: ['editar', 'eliminar', 'deshabilitar']
    },
    fundaciones: {
      headers: ['ID', 'Nombre', 'Ubicación', 'Contacto', 'Estado', 'Acciones'],
      columns: ['id_fundacion', 'nombre_fundacion', 'ubicacion', 'contacto', 'estado_validacion'],
      acciones: ['editar', 'eliminar', 'deshabilitar']
    },
    animales: {
      headers: ['ID', 'Nombre', 'Especie', 'Edad', 'Estado Médico', 'Descripción', 'Estado', 'Acciones'],
      columns: ['id_animal', 'nombre', 'especie', 'edad_aprox', 'estado_medico', 'descripcion', 'estado'],
      acciones: ['editar', 'eliminar', 'deshabilitar']
    },
    rescates: {
      headers: ['ID', 'Usuario', 'Descripción', 'Estado'],
      columns: ['id_rescate', 'id_usuario', 'descripcion', 'estado'],
      acciones: ['editar', 'eliminar', 'deshabilitar']
    },
    adopciones: {
      headers: ['ID', 'Usuario', 'Animal', 'Fecha', 'Mensaje', 'Estado'],
      columns: ['id_solicitud', 'id_usuario', 'id_animal', 'fecha_solicitud', 'mensaje', 'estado'],
      acciones: ['aprobar', 'rechazar']
    },
    voluntariado: {
      headers: ['ID', 'Voluntario', 'Correo', 'Evento', 'Fecha Evento', 'Fecha Postulación', 'Estado', 'Observaciones', 'Acciones'],
      columns: ['id_postulacion', 'nombre_usuario', 'correo_usuario', 'nombre_evento', 'fecha_evento', 'fecha_postulacion', 'estado', 'observaciones'],
      acciones: ['editar', 'eliminar', 'deshabilitar']
    },
    donaciones: {
      headers: ['ID', 'Donante', 'Título', 'Monto', 'Método de Pago', 'Fundación', 'Fecha', 'Estado', 'Acciones'],
      columns: ['id_donacion', 'nombre_usuario', 'titulo', 'monto', 'metodo_pago', 'nombre_fundacion', 'fecha', 'estado'],
      acciones: ['editar', 'deshabilitar']
    },
    campañas: {
      headers: ['ID', 'Fundación', 'Título', 'Meta', 'Estado', 'Acciones'],
      columns: ['id_campana', 'id_fundacion', 'titulo', 'meta', 'estado'],
      acciones: ['editar', 'eliminar', 'deshabilitar']
    },
    eventos: {
      headers: ['ID', 'Fundación', 'Título', 'Fecha', 'Ubicación', 'Estado', 'Acciones'],
      columns: ['id_evento', 'id_fundacion', 'titulo', 'fecha_evento', 'ubicacion', 'estado'],
      acciones: ['editar', 'eliminar', 'deshabilitar']
    },
    reportes: {
      headers: ['ID', 'Título', 'Tipo', 'Fecha de Generación', 'Acciones'],
      columns: ['id_reporte', 'titulo', 'tipo', 'fecha_generacion', 'ver_reporte'],
      acciones: ['editar', 'eliminar', 'deshabilitar']
    }
  };
  
  
  function renderizarAnimales() {
    const listaAnimales = document.getElementById('lista-animales');
    listaAnimales.innerHTML = '';
  
    const especieSeleccionada = document.getElementById('filtro-especie').value;
    const estadoSeleccionado = document.getElementById('filtro-estado').value;
  
    const animalesFiltrados = data.animales.filter(animal => {
      const coincideEspecie = especieSeleccionada === 'todos' || animal.especie === especieSeleccionada;
      const coincideEstado = estadoSeleccionado === 'todos' || animal.estado === estadoSeleccionado;
      return coincideEspecie && coincideEstado;
    });
  
    if (animalesFiltrados.length === 0) {
      listaAnimales.innerHTML = '<p>No se encontraron animales con los filtros seleccionados.</p>';
      return;
    }
  
    animalesFiltrados.forEach(animal => {
      const card = document.createElement('div');
      card.className = 'animal-card';
      card.id = `animal-${animal.id_animal}`;
      card.innerHTML = `
        <img src="${animal.fotos}" alt="Foto de ${animal.nombre}">
        <div class="card-content">
          <h3>${animal.nombre}</h3>
          <p><strong>Especie:</strong> ${animal.especie}</p>
          <p><strong>Edad:</strong> ${animal.edad_aprox}</p>
          <p><strong>Estado Médico:</strong> ${animal.estado_medico}</p>
          <p><strong>Descripción:</strong> ${animal.descripcion}</p>
          <p class="estado"><strong>Estado:</strong> ${animal.estado.charAt(0).toUpperCase() + animal.estado.slice(1)}</p>
        </div>
        <div class="card-actions">
          <button onclick="editar('animales', ${animal.id_animal})">Editar</button>
          <button onclick="eliminar('animales', ${animal.id_animal})">Eliminar</button>
          <button onclick="deshabilitar('animales', ${animal.id_animal})">${animal.estado === 'disponible' ? 'Deshabilitar' : 'Habilitar'}</button>
        </div>
      `;
      listaAnimales.appendChild(card);
    });
  }
  
  function renderizarCampañas() {
    const listaCampañas = document.getElementById('lista-campañas');
    listaCampañas.innerHTML = '';
  
    if (data.campañas.length === 0) {
      listaCampañas.innerHTML = '<p>No hay campañas registradas.</p>';
      return;
    }
  
    data.campañas.forEach(campaña => {
      const card = document.createElement('div');
      card.className = 'campaña-card';
      card.id = `campaña-${campaña.id_campana}`;
      
      let actionButton = '';
      if (campaña.estado === 'activa') {
        if (campaña.tipo === 'donacion') {
          actionButton = `<button class="btn-participar" onclick="donar(${campaña.id_campana})">Donar</button>`;
        } else if (campaña.tipo === 'voluntariado') {
          actionButton = `<button class="btn-participar" onclick="participar(${campaña.id_campana})">Participar como Voluntario</button>`;
        }
      }
  
      card.innerHTML = `
        <img src="${campaña.fotos}" alt="Imagen de campaña">
        <div class="card-content">
          <h3>${campaña.titulo}</h3>
          <p><strong>Meta:</strong> ${campaña.meta}</p>
          <p><strong>Descripción:</strong> ${campaña.descripcion}</p>
          <p><strong>Fechas:</strong> ${campaña.fecha_inicio} al ${campaña.fecha_fin}</p>
          <p class="estado"><strong>Estado:</strong> ${campaña.estado.charAt(0).toUpperCase() + campaña.estado.slice(1)}</p>
        </div>
        <div class="card-actions">
          ${actionButton}
          <button onclick="editar('campañas', ${campaña.id_campana})">Editar</button>
          <button onclick="eliminar('campañas', ${campaña.id_campana})">Eliminar</button>
          <button onclick="deshabilitar('campañas', ${campaña.id_campana})">${campaña.estado === 'activa' ? 'Deshabilitar' : 'Habilitar'}</button>
        </div>
      `;
      listaCampañas.appendChild(card);
    });
  }
  
  // --- MODAL ---
  function openModal(title, body, actions) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-body').innerHTML = body;
    document.getElementById('modal-actions').innerHTML = actions;
    document.getElementById('modal').classList.remove('hidden');
  }
  
  function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }
  
  // --- ACCIONES ---
  function agregar(section) {
    let title = '';
    let body = '';
    let actions = '';
    switch (section) {
      case 'animales':
        title = 'Crear Publicación de Adopción';
        body = `
          <form id="form-animal">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for="especie">Especie:</label>
            <select id="especie" name="especie" required>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Conejo">Conejo</option>
            </select>
            <label for="edad_aprox">Edad (aprox):</label>
            <input type="text" id="edad_aprox" name="edad_aprox" required>
            <label for="estado_medico">Estado Médico:</label>
            <input type="text" id="estado_medico" name="estado_medico" required>
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" required></textarea>
            <label for="fotos">URL de la Foto:</label>
            <input type="url" id="fotos" name="fotos" required>
          </form>
        `;
        actions = `<button onclick="confirmarAgregar('${section}')">Guardar</button><button onclick="closeModal()">Cancelar</button>`;
        break;
      case 'campañas':
        title = 'Crear Nueva Campaña';
        body = `
          <form id="form-campaña">
            <label for="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" required>
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" required></textarea>
            <label for="meta">Meta:</label>
            <input type="text" id="meta" name="meta" required>
            <label for="fecha_inicio">Fecha de Inicio:</label>
            <input type="date" id="fecha_inicio" name="fecha_inicio" required>
            <label for="fecha_fin">Fecha de Fin:</label>
            <input type="date" id="fecha_fin" name="fecha_fin" required>
            <label for="tipo">Tipo de Campaña:</label>
            <select id="tipo" name="tipo" required>
              <option value="donacion">Donación</option>
              <option value="voluntariado">Voluntariado</option>
            </select>
            <label for="fotos">URL de la Imagen (opcional):</label>
            <input type="url" id="fotos" name="fotos">
          </form>
        `;
        actions = `<button onclick="confirmarAgregar('${section}')">Guardar</button><button onclick="closeModal()">Cancelar</button>`;
        break;
      case 'voluntariado':
        title = 'Agregar Nuevo Voluntario';
        body = `
          <form id="form-voluntario">
            <label for="nombre_usuario">Nombre:</label>
            <input type="text" id="nombre_usuario" name="nombre_usuario" required>
            <label for="correo">Correo:</label>
            <input type="email" id="correo" name="correo" required>
            <label for="contraseña">Contraseña:</label>
            <input type="password" id="contraseña" name="contraseña" required>
            <label for="id_evento">Evento de Postulación:</label>
            <select id="id_evento" name="id_evento" required>
              ${data.eventos.map(e => `<option value="${e.id_evento}">${e.titulo}</option>`).join('')}
            </select>
            <label for="fecha_postulacion">Fecha de Postulación:</label>
            <input type="date" id="fecha_postulacion" name="fecha_postulacion" required>
            <label for="observaciones">Observaciones / Tareas:</label>
            <textarea id="observaciones" name="observaciones"></textarea>
          </form>
        `;
        actions = `<button onclick="confirmarAgregar('${section}')">Guardar</button><button onclick="closeModal()">Cancelar</button>`;
        break;
      case 'donaciones':
        title = 'Registrar Nueva Donación';
        body = `
          <form id="form-donacion">
            <label for="id_usuario">Donante:</label>
            <select id="id_usuario" name="id_usuario" required>
              ${data.usuarios.filter(u => u.rol === 'Donante').map(u => `<option value="${u.id_usuario}">${u.nombre_usuario}</option>`).join('')}
            </select>
            <label for="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" required>
            <label for="monto">Monto:</label>
            <input type="number" id="monto" name="monto" required>
            <label for="id_fundacion">Fundación:</label>
            <select id="id_fundacion" name="id_fundacion" required>
              ${data.fundaciones.map(f => `<option value="${f.id_fundacion}">${f.nombre_fundacion}</option>`).join('')}
            </select>
            <label for="metodo_pago">Método de Pago:</label>
            <select id="metodo_pago" name="metodo_pago" required>
              <option value="Tarjeta de crédito">Tarjeta de crédito</option>
              <option value="PayPal">PayPal</option>
              <option value="Transferencia bancaria">Transferencia bancaria</option>
            </select>
            <label for="comprobante">URL del Comprobante:</label>
            <input type="url" id="comprobante" name="comprobante" required>
            <label for="fecha">Fecha:</label>
            <input type="date" id="fecha" name="fecha" required>
          </form>
        `;
        actions = `<button onclick="confirmarAgregar('${section}')">Guardar</button><button onclick="closeModal()">Cancelar</button>`;
        break;
      case 'reportes':
        title = 'Generar Nuevo Reporte';
        body = `
          <form id="form-reporte">
            <label for="tipo_reporte">Tipo de Reporte:</label>
            <select id="tipo_reporte" name="tipo_reporte" required>
              <option value="donaciones">Donaciones</option>
              <option value="animales">Animales</option>
              <option value="voluntariado">Voluntariado</option>
            </select>
            <label for="fecha_inicio">Fecha de Inicio (Opcional):</label>
            <input type="date" id="fecha_inicio" name="fecha_inicio">
            <label for="fecha_fin">Fecha de Fin (Opcional):</label>
            <input type="date" id="fecha_fin" name="fecha_fin">
          </form>
        `;
        actions = `<button onclick="confirmarAgregar('${section}')">Generar</button><button onclick="closeModal()">Cancelar</button>`;
        break;
      default:
        title = `Agregar ${section.charAt(0).toUpperCase() + section.slice(1)}`;
        body = `<p>Formulario para agregar ${section}</p>`;
        actions = `<button onclick="closeModal()">Cerrar</button>`;
    }
    openModal(title, body, actions);
  }
  
  function confirmarAgregar(section) {
    const form = document.getElementById(`form-${section}`);
    if (section === 'animales') {
      const newAnimal = {
        id_animal: ++lastId.animales,
        id_fundacion: 101,
        nombre: form.nombre.value,
        especie: form.especie.value,
        edad_aprox: form.edad_aprox.value,
        estado_medico: form.estado_medico.value,
        descripcion: form.descripcion.value,
        ubicacion: 'Bogotá',
        fotos: form.fotos.value,
        estado: 'disponible'
      };
      data.animales.push(newAnimal);
    } else if (section === 'campañas') {
      const newCampana = {
        id_campana: ++lastId.campañas,
        id_fundacion: 101,
        titulo: form.titulo.value,
        descripcion: form.descripcion.value,
        meta: form.meta.value,
        fecha_inicio: form.fecha_inicio.value,
        fecha_fin: form.fecha_fin.value,
        tipo: form.tipo.value,
        fotos: form.fotos.value || 'https://via.placeholder.com/150',
        estado: 'activa'
      };
      data.campañas.push(newCampana);
    } else if (section === 'voluntariado') {
      const newUserId = ++lastId.usuarios;
      const newUser = {
        id_usuario: newUserId,
        nombre_usuario: form.nombre_usuario.value,
        correo: form.correo.value,
        contraseña: form.contraseña.value,
        rol: 'Voluntario',
        fecha_registro: new Date().toISOString().slice(0, 10),
        estado: 'Activo'
      };
      data.usuarios.push(newUser);
  
      const newPostulacion = {
        id_postulacion: ++lastId.voluntariado,
        id_usuario: newUserId,
        id_evento: parseInt(form.id_evento.value),
        fecha_postulacion: form.fecha_postulacion.value,
        estado: 'pendiente',
        observaciones: form.observaciones.value
      };
      data.voluntariado.push(newPostulacion);
    } else if (section === 'donaciones') {
      const newDonacion = {
        id_donacion: ++lastId.donaciones,
        id_usuario: parseInt(form.id_usuario.value),
        titulo: form.titulo.value,
        monto: parseFloat(form.monto.value),
        id_fundacion: parseInt(form.id_fundacion.value),
        metodo_pago: form.metodo_pago.value,
        comprobante: form.comprobante.value,
        fecha: form.fecha.value,
        estado: 'aceptada'
      };
      data.donaciones.push(newDonacion);
    } else if (section === 'reportes') {
      const tipoReporte = form.tipo_reporte.value;
      const fechaInicio = form.fecha_inicio.value || 'N/A';
      const fechaFin = form.fecha_fin.value || 'N/A';
      const fechaGeneracion = new Date().toISOString().slice(0, 10);
      const locked = tipoReporte === 'donaciones';
  
      const newReporte = {
        id_reporte: ++lastId.reportes,
        titulo: `Reporte de ${tipoReporte.charAt(0).toUpperCase() + tipoReporte.slice(1)}`,
        tipo: tipoReporte,
        fecha_generacion: fechaGeneracion,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        estado: 'activo',
        locked: locked
      };
      data.reportes.push(newReporte);
    }
    mostrarSeccion(section);
    closeModal();
  }
  
  function editar(section, id) {
    const item = data[section].find(i => i[secciones[section].columns[0]] == id);
    if (!item) return;
  
    if (item.locked) {
      alert('Este reporte está bloqueado y no puede ser modificado.');
      return;
    }
  
    let body = '';
    let fields;
    
    if (section === 'campañas') {
      fields = ['titulo', 'descripcion', 'meta', 'fecha_inicio', 'fecha_fin', 'tipo', 'fotos'];
    } else if (section === 'voluntariado') {
      fields = ['fecha_postulacion', 'estado', 'observaciones'];
    } else if (section === 'donaciones') {
      fields = ['titulo', 'monto', 'metodo_pago', 'fecha', 'estado'];
    } else if (section === 'reportes') {
        fields = ['titulo', 'fecha_inicio', 'fecha_fin'];
    } else {
      fields = Object.keys(item).filter(key => key !== 'id_fundacion' && key !== 'id_animal');
    }
  
    body = `<form id="form-editar">`;
    fields.forEach(field => {
      let value = item[field];
      if (field === 'descripcion' || field === 'observaciones') {
          body += `<label for="${field}">${field.charAt(0).toUpperCase() + field.slice(1)}:</label><textarea id="${field}" name="${field}">${value}</textarea>`;
      } else if (field === 'fotos') {
          body += `<label for="${field}">URL de la Foto:</label><input type="url" id="${field}" name="${field}" value="${value || ''}">`;
      } else if (field.includes('fecha')) {
          body += `<label for="${field}">${field.replace('_', ' ').charAt(0).toUpperCase() + field.replace('_', ' ').slice(1)}:</label><input type="date" id="${field}" name="${field}" value="${value}">`;
      } else if (field === 'tipo') {
          body += `<label for="tipo">Tipo de Campaña:</label>
                   <select id="tipo" name="tipo" required>
                     <option value="donacion" ${value === 'donacion' ? 'selected' : ''}>Donación</option>
                     <option value="voluntariado" ${value === 'voluntariado' ? 'selected' : ''}>Voluntariado</option>
                   </select>`;
      } else if (field === 'estado') {
          let options;
          if (section === 'voluntariado') {
              options = ['aceptada', 'pendiente', 'rechazada', 'deshabilitado'];
          } else if (section === 'donaciones') {
              options = ['aceptada', 'pendiente', 'deshabilitada'];
          } else {
              options = ['activa', 'deshabilitada', 'finalizada'];
          }
          body += `<label for="estado">Estado:</label>
                   <select id="estado" name="estado" required>
                     ${options.map(o => `<option value="${o}" ${value === o ? 'selected' : ''}>${o.charAt(0).toUpperCase() + o.slice(1)}</option>`).join('')}
                   </select>`;
      } else if (field === 'metodo_pago') {
          let options = ['Tarjeta de crédito', 'PayPal', 'Transferencia bancaria'];
          body += `<label for="metodo_pago">Método de Pago:</label>
                   <select id="metodo_pago" name="metodo_pago" required>
                     ${options.map(o => `<option value="${o}" ${value === o ? 'selected' : ''}>${o}</option>`).join('')}
                   </select>`;
      } else {
          body += `<label for="${field}">${field.charAt(0).toUpperCase() + field.slice(1)}:</label><input type="text" id="${field}" name="${field}" value="${value}">`;
      }
    });
    body += `</form>`;
  
    const actions = `<button onclick="confirmarEditar('${section}', ${id})">Guardar</button><button onclick="closeModal()">Cancelar</button>`;
    openModal(`Editar ${section.charAt(0).toUpperCase() + section.slice(1)}`, body, actions);
  }
  
  function confirmarEditar(section, id) {
    const item = data[section].find(i => i[secciones[section].columns[0]] == id);
    if (item.locked) return;
    const formFields = document.getElementById('modal-body').querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
      item[field.id] = field.value;
    });
    mostrarSeccion(section);
    closeModal();
  }
  
  function eliminar(section, id) {
    const item = data[section].find(i => i[secciones[section].columns[0]] == id);
    if (!item) return;
  
    if (item.locked) {
      alert('Este reporte está bloqueado y no puede ser eliminado.');
      return;
    }
  
    const html = `<p>¿Seguro que deseas eliminar el registro <b>${id}</b>?</p>`;
    const actions = `<button onclick="confirmarEliminar('${section}',${id})">Eliminar</button><button onclick="closeModal()">Cancelar</button>`;
    openModal('Eliminar', html, actions);
  }
  
  function confirmarEliminar(section, id) {
    const item = data[section].find(i => i[secciones[section].columns[0]] == id);
    if (item.locked) return;
  
    data[section] = data[section].filter(item => item[secciones[section].columns[0]] != id);
    mostrarSeccion(section);
    closeModal();
  }
  
  function deshabilitar(section, id) {
    const item = data[section].find(i => i[secciones[section].columns[0]] == id);
    if (!item) return;
  
    if (item.locked) {
      alert('Este reporte está bloqueado y no puede ser deshabilitado.');
      return;
    }
  
    const action = (item.estado === 'activa' || item.estado === 'disponible' || item.estado === 'aceptada' || item.estado === 'pendiente') ? 'Deshabilitar' : 'Habilitar';
    const html = `<p>¿Deseas ${action.toLowerCase()} este registro?</p>`;
    const actions = `<button onclick="confirmarDeshabilitar('${section}',${id})">${action}</button><button onclick="closeModal()">Cancelar</button>`;
    openModal(action, html, actions);
  }
  
  function confirmarDeshabilitar(section, id) {
    const item = data[section].find(i => i[secciones[section].columns[0]] == id);
    if (item.locked) return;
  
    if (section === 'voluntariado' || section === 'donaciones') {
      item.estado = (item.estado === 'aceptada' || item.estado === 'pendiente') ? 'deshabilitada' : 'aceptada';
    } else {
      item.estado = (item.estado === 'activa' || item.estado === 'disponible') ? 'deshabilitada' : 'activa';
    }
    mostrarSeccion(section);
    closeModal();
  }
  
  function donar(id) {
    alert(`¡Gracias por tu donación! Se ha simulado una donación para la campaña con ID ${id}.`);
  }
  
  function participar(id) {
    alert(`¡Gracias por tu interés! Te has postulado para participar como voluntario en la campaña con ID ${id}.`);
  }
  
  function verReporte(id) {
    const reporte = data.reportes.find(r => r.id_reporte === id);
    if (!reporte) return;
  
    const reporteContenido = document.getElementById('reporte-contenido');
    reporteContenido.innerHTML = '';
    
    const titulo = document.createElement('h3');
    titulo.textContent = reporte.titulo;
    reporteContenido.appendChild(titulo);
  
    const stats = document.createElement('div');
    stats.className = 'reporte-stats';
  
    if (reporte.tipo === 'donaciones') {
      const donacionesFiltradas = data.donaciones.filter(d => {
        if (reporte.fecha_inicio && reporte.fecha_fin) {
          return d.fecha >= reporte.fecha_inicio && d.fecha <= reporte.fecha_fin;
        }
        return true;
      });
      const totalMonto = donacionesFiltradas.reduce((sum, d) => sum + d.monto, 0);
      const totalDonaciones = donacionesFiltradas.length;
      stats.innerHTML = `
        <p>Total de Donaciones: <strong>${totalDonaciones}</strong></p>
        <p>Monto Total Recaudado: <strong>$${totalMonto.toLocaleString('es-CO')}</strong></p>
      `;
    } else if (reporte.tipo === 'animales') {
      const animalesFiltrados = data.animales.filter(a => a.estado === 'disponible' || a.estado === 'adoptado');
      const totalAnimales = animalesFiltrados.length;
      const animalesDisponibles = animalesFiltrados.filter(a => a.estado === 'disponible').length;
      const animalesAdoptados = animalesFiltrados.filter(a => a.estado === 'adoptado').length;
      stats.innerHTML = `
        <p>Total de Animales Registrados: <strong>${totalAnimales}</strong></p>
        <p>Animales Disponibles para Adopción: <strong>${animalesDisponibles}</strong></p>
        <p>Animales Adoptados: <strong>${animalesAdoptados}</strong></p>
      `;
    } else if (reporte.tipo === 'voluntariado') {
      const totalVoluntarios = data.voluntariado.length;
      const postulacionesAceptadas = data.voluntariado.filter(v => v.estado === 'aceptada').length;
      const postulacionesPendientes = data.voluntariado.filter(v => v.estado === 'pendiente').length;
      stats.innerHTML = `
        <p>Total de Postulaciones: <strong>${totalVoluntarios}</strong></p>
        <p>Postulaciones Aceptadas: <strong>${postulacionesAceptadas}</strong></p>
        <p>Postulaciones Pendientes: <strong>${postulacionesPendientes}</strong></p>
      `;
    }
    
    reporteContenido.appendChild(stats);
  
    const tabla = document.createElement('table');
    tabla.className = 'data-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr>${secciones[reporte.tipo].headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    tabla.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    
    const datosReporte = data[reporte.tipo].filter(d => {
      if (reporte.fecha_inicio && reporte.fecha_fin) {
        return d.fecha >= reporte.fecha_inicio && d.fecha <= reporte.fecha_fin;
      }
      return true;
    });
  
    datosReporte.forEach(item => {
      const row = document.createElement('tr');
      
      const usuario = data.usuarios.find(u => u.id_usuario === item.id_usuario);
      const evento = data.eventos.find(e => e.id_evento === item.id_evento);
      const fundacion = data.fundaciones.find(f => f.id_fundacion === item.id_fundacion);
      
      const columnsToDisplay = secciones[reporte.tipo].columns.map(col => {
        if (col === 'nombre_usuario') return usuario ? usuario.nombre_usuario : 'N/A';
        if (col === 'correo_usuario') return usuario ? usuario.correo : 'N/A';
        if (col === 'nombre_evento') return evento ? evento.titulo : 'N/A';
        if (col === 'fecha_evento') return evento ? evento.fecha_evento : 'N/A';
        if (col === 'nombre_fundacion') return fundacion ? fundacion.nombre_fundacion : 'N/A';
        if (col === 'monto') return `$${item.monto.toLocaleString('es-CO')}`;
        return item[col];
      });
  
      columnsToDisplay.forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
  
    tabla.appendChild(tbody);
    reporteContenido.appendChild(tabla);
    
    const btnExportarPDF = document.getElementById('btn-exportar-pdf');
    const btnExportarExcel = document.getElementById('btn-exportar-excel');
    btnExportarPDF.classList.remove('hidden');
    btnExportarExcel.classList.remove('hidden');
  
  }
  
  function exportar(tipo) {
    alert(`Simulando la exportación del reporte a ${tipo.toUpperCase()}.`);
  }