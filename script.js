		 const alertTextElement = document.getElementById('alertText'); 
         const form = document.getElementById('trabajoForm');
         const tabla = document.getElementById('registrosTabla').getElementsByTagName('tbody')[0];
         const resumen = document.getElementById('resumen');
         const submitBtn = document.getElementById('submitBtn');
         const guardarBtn = document.getElementById('guardarBtn');
         const exportarBtn = document.getElementById('exportarBtn');
         const anoSelect = document.getElementById('anoSelect');
         const mesSelect = document.getElementById('mesSelect');
         const cargarPeriodoBtn = document.getElementById('cargarPeriodoBtn');
         let registros = [];
         let editIndex = -1;
         
         const TARIFA_HORA_NORMAL = 216.24;
         const TARIFA_HORA_NOCTURNA = 259.49;
         const TARIFA_FICTO_PROPINA = 196.60;
         
         // Inicializar selectores de año y mes
         const anoActual = new Date().getFullYear();
         for (let i = anoActual - 9; i <= anoActual + 9; i++) {
             const option = document.createElement('option');
             option.value = i;
             option.textContent = i;
             anoSelect.appendChild(option);
         }
         anoSelect.value = anoActual;
         
         const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
         meses.forEach((mes, index) => {
             const option = document.createElement('option');
             option.value = index + 1;
             option.textContent = mes;
             mesSelect.appendChild(option);
         });
         mesSelect.value = new Date().getMonth() + 1;
         
         form.addEventListener('submit', function(e) {
             e.preventDefault();
             const fecha = document.getElementById('fecha').value;
             const horaEntrada = document.getElementById('horaEntrada').value;
             const horaSalida = document.getElementById('horaSalida').value;
             const cantidadFictoPropina = parseInt(document.getElementById('fictoPropina').value) || 0;
         
             const registro = {
                 fecha,
                 horaEntrada,
                 horaSalida,
                 cantidadFictoPropina,
                 horasNormales: 0,
                 horasNocturnas: 0
             };
         
             calcularHoras(registro);
         
             if (editIndex === -1) {
                 registros.push(registro);
             } else {
                 registros[editIndex] = registro;
                 editIndex = -1;
                 submitBtn.textContent = 'Agregar Registro';
             }
         
             actualizarTabla();
             calcularResumen();
             form.reset();
         });
			function change(button) {
				const colors = ['grey', '#f1f3f4'];
				const currentColor = button.style.backgroundColor;
				let currentIndex = colors.indexOf(currentColor);
				let nextIndex = (currentIndex + 1) % colors.length;
				button.style.backgroundColor = colors[nextIndex];
				if (currentColor == 'grey')
				{
					
					document.getElementById('titulos').style.color = 'RoyalBlue';
					document.getElementById('resumen').style.color = '#333333';
					document.getElementById('resumen').style.backgroundColor = '#ffffff';
					document.getElementById('alert').style.backgroundColor = '#ffffff';
					document.body.style.backgroundColor = '#f1f3f4';
					let elements = document.getElementsByClassName("main-content");

					for (let i = 0; i < elements.length; i++) {
					elements[i].style.color = '#333333';
					elements[i].style.backgroundColor = '#ffffff';
					}
					var sidebar = document.querySelector('.sidebar');
					sidebar.style.background = '#ffffff';		
					var inputs = document.querySelectorAll('input[type="date"], input[type="time"], input[type="number"], select');
					inputs.forEach(function(input) {
					input.style.backgroundColor ='#f1f3f4';
					input.style.color ='black';
					input.style.border ='1px, solid, #dddddd';
					});
					var gift = document.querySelector('.gift');
					gift.style.display = 'block';
					var gifts = document.querySelector('.gifts');
					gifts.style.display = 'none';
					var sun = document.querySelector('.sun');
					sun.style.display = 'block';
					var moon = document.querySelector('.moon');
					moon.style.display = 'none';
				}
				else
				{			
					document.getElementById('titulos').style.color = '#E5E5E2';
					document.getElementById('resumen').style.color = '#CECCC5';
					document.getElementById('resumen').style.backgroundColor = '#2A2A26';
					document.getElementById('alert').style.backgroundColor = '#393937';
					document.body.style.backgroundColor = '#2C2B28';
					let elements = document.getElementsByClassName("main-content");

					for (let i = 0; i < elements.length; i++) {
					elements[i].style.color = '#CECCC5';
					elements[i].style.backgroundColor = '#393937';
					}
					var sidebar = document.querySelector('.sidebar');
					sidebar.style.background = '#393937';
					var inputs = document.querySelectorAll('input[type="date"], input[type="time"], input[type="number"], select');
					inputs.forEach(function(input) {
					input.style.backgroundColor ='#2A2A26';
					input.style.color ='#CECCC5';
					input.style.border ='1px, solid, black';
					});					
					var gift = document.querySelector('.gift');
					gift.style.display = 'none';
					var gifts = document.querySelector('.gifts');
					gifts.style.display = 'block';
					var sun = document.querySelector('.sun');
					sun.style.display = 'none';
					var moon = document.querySelector('.moon');
					moon.style.display = 'block';
				}
			}

          
         function calcularHoras(registro) {
             const entrada = new Date(`${registro.fecha}T${registro.horaEntrada}`);
             const salida = new Date(`${registro.fecha}T${registro.horaSalida}`);
             if (salida < entrada) salida.setDate(salida.getDate() + 1);
         
             let horasNormales = 0;
             let horasNocturnas = 0;
             let current = new Date(entrada);
         
             while (current < salida) {
                 const hour = current.getHours();
                 if (hour >= 22 || hour < 6) {
                     horasNocturnas++;
                 } else {
                     horasNormales++;
                 }
                 current.setHours(current.getHours() + 1);
             }
         
             registro.horasNormales = horasNormales;
             registro.horasNocturnas = horasNocturnas;
         }
         function actualizarTabla() {
         tabla.innerHTML = '';
         registros.forEach((r, index) => {
         const row = tabla.insertRow();
         row.insertCell().textContent = r.fecha;
         row.insertCell().textContent = r.horaEntrada;
         row.insertCell().textContent = r.horaSalida;
         row.insertCell().textContent = r.horasNormales;
         row.insertCell().textContent = r.horasNocturnas;
         row.insertCell().textContent = r.cantidadFictoPropina;
		 document.getElementById('alert').style.display = 'block';
				alertTextElement.textContent = "Registro Editado ";
				setTimeout(() => {
            document.getElementById('alert').style.display = 'none';
        }, 2000);
         
         const accionesCell = row.insertCell();
         accionesCell.className = 'acciones'; // Añadido para aplicar estilo específico
         
         const editarSpan = document.createElement('span');
         editarSpan.textContent = 'Editar' ;
         editarSpan.className = 'accion';
         editarSpan.onclick = () => editarRegistro(index);
         accionesCell.appendChild(editarSpan);
         
         const eliminarSpan = document.createElement('span');
         eliminarSpan.textContent = 'Eliminar';
         eliminarSpan.className = 'accion eliminar'; // Añadido para aplicar estilo específico
         eliminarSpan.onclick = () => eliminarRegistro(index);
         accionesCell.appendChild(eliminarSpan);
         });
         }
         
         function eliminarRegistro(index) {
			if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
         registros.splice(index, 1);
         actualizarTabla();
         calcularResumen();
			}
        }
         
         function editarRegistro(index) {
             const registro = registros[index];
             document.getElementById('fecha').value = registro.fecha;
             document.getElementById('horaEntrada').value = registro.horaEntrada;
             document.getElementById('horaSalida').value = registro.horaSalida;
             document.getElementById('fictoPropina').value = registro.cantidadFictoPropina;
             editIndex = index;
             submitBtn.textContent = 'Actualizar Registro';
         }
         
         function calcularResumen() {
         const totalHorasNormales = registros.reduce((sum, r) => sum + r.horasNormales, 0);
         const totalHorasNocturnas = registros.reduce((sum, r) => sum + r.horasNocturnas, 0);
         const totalCantidadFictoPropina = registros.reduce((sum, r) => sum + r.cantidadFictoPropina, 0);
         
         const pagoHorasNormales = totalHorasNormales * TARIFA_HORA_NORMAL;
         const pagoHorasNocturnas = totalHorasNocturnas * TARIFA_HORA_NOCTURNA;
         const pagoFictoPropina = totalCantidadFictoPropina * TARIFA_FICTO_PROPINA;
         const pagoTotal = pagoHorasNormales + pagoHorasNocturnas + pagoFictoPropina;
         
         const bps = pagoTotal * 0.15;
         const snis = pagoTotal * 0.03;
         const frl = pagoTotal * 0.001;
         const totalDescuentos = bps + snis + frl;
         const pagoNeto = pagoTotal - totalDescuentos;
         
         // Obtener el año y mes seleccionados
		const ano = anoSelect.value;
		const mes = meses[mesSelect.value - 1]; // Obtener el nombre del mes

		// Actualizar el contenido del resumen
		 resumen.innerHTML = `
         <h2>Resumen para ${mes} ${ano}</h2>
         <p>Total Horas Normales: ${totalHorasNormales.toFixed(2)}</p>
         <p>Total Horas Nocturnas: ${totalHorasNocturnas.toFixed(2)}</p>
         <p>Total Cantidad Ficto Propina: ${totalCantidadFictoPropina}</p>
         <p>Pago Horas Normales: $${pagoHorasNormales.toFixed(2)}</p>
         <p>Pago Horas Nocturnas: $${pagoHorasNocturnas.toFixed(2)}</p>
         <p>Pago Ficto Propina: $${pagoFictoPropina.toFixed(2)}</p>
         <p><b>Pago Total: $${pagoTotal.toFixed(2)}</b></p>
         <p>B.P.S (15%): $${bps.toFixed(2)}</p>
         <p>S.N.I.S (3%): $${snis.toFixed(2)}</p>
         <p>F.R.L (0.1%): $${frl.toFixed(2)}</p>
         <p>Total Descuentos: $${totalDescuentos.toFixed(2)}</p>
         <p><b>Pago Neto: $${pagoNeto.toFixed(2)}</b></p>
         `;
         
         }
         guardarBtn.addEventListener('click', function() {
    const ano = anoSelect.value;
    const mes = mesSelect.value;
    const claveMes = `registrosTrabajo_${ano}_${mes}`;
    const claveTodoJunto = `registrosTrabajo_${ano}_todoJunto`;
    const registrosGuardadosMes = localStorage.getItem(claveMes);
    const registrosGuardadosTodoJunto = localStorage.getItem(claveTodoJunto);

    // Guardar los registros en el mes correspondiente
    if (registrosGuardadosMes) {
        if (confirm('Ya hay registros guardados para este período. ¿Deseas sobrescribirlos?')) {
            localStorage.setItem(claveMes, JSON.stringify(registros));
        }
    } else {
        localStorage.setItem(claveMes, JSON.stringify(registros));
    }

    // Guardar los registros también en "todo junto"
    let registrosTodoJunto = registrosGuardadosTodoJunto ? JSON.parse(registrosGuardadosTodoJunto) : [];
    registrosTodoJunto = registrosTodoJunto.concat(registros); // Concatenar los nuevos registros
    localStorage.setItem(claveTodoJunto, JSON.stringify(registrosTodoJunto));

    document.getElementById('alert').style.display = 'block';
    alertTextElement.textContent = "Registros Guardados";
    setTimeout(() => {
        document.getElementById('alert').style.display = 'none';
    }, 2000);
});

         
         cargarPeriodoBtn.addEventListener('click', function() {
             const ano = anoSelect.value;
             const mes = mesSelect.value;
             const clave = `registrosTrabajo_${ano}_${mes}`;
             const registrosGuardados = localStorage.getItem(clave);
             if (registrosGuardados) {
                 registros = JSON.parse(registrosGuardados);
                 actualizarTabla();
                 calcularResumen();
				
				document.getElementById('alert').style.display = 'block';
				alertTextElement.textContent = "Registros Cargados";
				setTimeout(() => {
				document.getElementById('alert').style.display = 'none';
				}, 2000);
    } else {
				document.getElementById('alert').style.display = 'block';
				alertTextElement.textContent = "No hay Registros";
				setTimeout(() => {
				document.getElementById('alert').style.display = 'none';
				}, 2000);
    }
});

         
         exportarBtn.addEventListener('click', function() {
             const ano = anoSelect.value;
             const mes = mesSelect.value;
             let csvContent = "data:text/csv;charset=utf-8,";
             csvContent += "Registro,Fecha,Hora Entrada,Hora Salida,Horas Normales,Horas Nocturnas,Cantidad Ficto Propina\n";
             
             registros.forEach((r, index) => {
                 csvContent += `${index + 1},${r.fecha},${r.horaEntrada},${r.horaSalida},${r.horasNormales},${r.horasNocturnas},${r.cantidadFictoPropina}\n`;
             });
         
             const encodedUri = encodeURI(csvContent);
             const link = document.createElement("a");
             link.setAttribute("href", encodedUri);
             link.setAttribute("download", `registros_trabajo_${ano}_${mes}.csv`);
             document.body.appendChild(link);
             link.click();
         });
		 const logo = document.getElementById("logo");

// Al hacer clic en el logo, se expande o contrae.
logo.addEventListener("click", function(event) {
    event.stopPropagation(); // Evita que el clic se propague al documento.
    this.classList.toggle("expanded");
});

// Al hacer clic en cualquier parte del documento fuera del logo, se cierra.
document.addEventListener("click", function() {
    logo.classList.remove("expanded");
});
// Detección del dispositivo
function ajustarConfiguracionSegunDispositivo() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
	
    if (isMobile) {
		var tableHeaders = document.querySelectorAll('.tablal th'); // Selecciona todos los th dentro de .tablal
		var sidebar = document.querySelector('.sidebar');
		var sidebarH3 = document.querySelector('.sidebar h3'); // Selecciona el h3 dentro de sidebar

					document.getElementById('titulos').style.fontSize="4vw";
                    document.querySelector('.alert').style.left="76%";
                    document.querySelector('.alert').style.bottom="70%";
                    document.querySelector('.alert').style.height= '50px'
                    document.querySelector('.alert').style.width= '130px';
					sidebar.style.position= "fixed";
					sidebar.style.left="76%";
					sidebar.style.height="160px";
					sidebar.style.width=" 130px";
					// Modifica el h3 dentro de la sidebar
					sidebarH3.style.position = "absolute";
					sidebarH3.style.top = "-20px"; // Ajusta la posición vertical
					sidebarH3.style.left = "10px"; // Ajusta la posición horizontal
                    sidebarH3.style.fontweight="4";
                    tableHeaders.forEach(th => {
                    th.style.fontSize = "70%"; // Ajusta el tamaño de la fuente para dispositivos móviles
                    })       
    } else {
        // Configuración para computadoras
		var sidebar = document.querySelector('.sidebar');
		var sidebarH3 = document.querySelector('.sidebar h3'); // Selecciona el h3 dentro de sidebar
		var tableHeaders = document.querySelectorAll('.tablal th'); // Selecciona todos los th dentro de .tablal		
					document.getElementById('titulos').style.fontSize="2vw";
                    document.querySelector('.alert').style.left="85%";
                    document.querySelector('.alert').style.bottom="200px";
                    document.querySelector('.alert').style.height= '50px'
                    document.querySelector('.alert').style.width= '130px';
					sidebar.style.position= "fixed";
					sidebar.style.left="84%";
					sidebar.style.height="180px";
					sidebar.style.width=" 150px";
					// Modifica el h3 dentro de la sidebar
					sidebarH3.style.position = "absolute";
					
					sidebarH3.style.top = "0px"; // Ajusta la posición vertical
					sidebarH3.style.left = "0px"; // Ajusta la posición horizontal
					tableHeaders.forEach(th => {
                    th.style.fontSize = "100%"; // Ajusta el tamaño de la fuente para dispositivos móviles
                    })     
       
    }
}

// Ejecutar la función al cargar la página
window.addEventListener('load', ajustarConfiguracionSegunDispositivo);

// Escuchar cambios en el tamaño de la pantalla
window.addEventListener('resize', ajustarConfiguracionSegunDispositivo);