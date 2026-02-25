const datos = {
  2026: {
    enero: {
      ingresos: 31166000,
      egresos: 10877200,
      pendiente: 1430000
    },
    febrero: {
      ingresos: 23915000,   
      egresos: 13644975,
      pendiente: 7725000
    }
  }
};

function saldo(m) {
  return m.ingresos - m.egresos;
}

function format(n) {
  return n.toLocaleString("es-ES");
}

const cont = document.getElementById("contenedor-meses");

const labels = [];
const ing = [];
const egr = [];
const sal = [];
const pen = [];

Object.entries(datos).forEach(([anio, meses]) => {
  Object.entries(meses).forEach(([mes, v]) => {

    cont.innerHTML += `
      <h2 class="mes">${mes} ${anio}</h2>
      <div class="cards">
        <div class="card ingresos">Ingresos<span>${format(v.ingresos)}</span></div>
        <div class="card egresos">Egresos<span>${format(v.egresos)}</span></div>
        <div class="card resultado">Saldo<span>${format(saldo(v))}</span></div>
        <div class="card pendientes">Pendiente<span>${format(v.pendiente)}</span></div>
      </div>
    `;

    labels.push(`${mes} ${anio}`);
    ing.push(v.ingresos);
    egr.push(v.egresos);
    sal.push(saldo(v));
    pen.push(v.pendiente);
  });
});

const ctx = document.getElementById("graficoResumen");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Ingresos",
        data: ing,
        backgroundColor: "#1e88e5"
      },
      {
        label: "Egresos",
        data: egr,
        backgroundColor: "#f9a825"
      },
      {
        label: "Saldo",
        data: sal,
        backgroundColor: "#6a1b9a"
      },
      {
        label: "Pendiente",
        data: pen,
        backgroundColor: "#e53935"
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 14,
          padding: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => value.toLocaleString("es-ES")
        },
        grid: {
          color: "rgba(0,0,0,0.05)"
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }
});