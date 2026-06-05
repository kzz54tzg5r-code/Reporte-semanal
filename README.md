# Reporte-semanal
Este reporte concentra los indicadores semanales, facilitando el seguimiento y análisis de resultados
import streamlit as st
import pandas as pd
import plotly.graph_objects as go

# Configuración de página estilo corporativo
st.set_page_config(layout="wide")

st.title("📊 Control Operativo Ropa — Cambios y Muertos")
st.markdown("### Resumen de Actividad por Semana")

# 1. Crear el DataFrame con los datos consolidados
data = {
    'Semana': ['Semana 19', 'Semana 20', 'Semana 21', 'Semana 22 (Corte)'],
    'Total Ingresos': [15724, 13758, 13561, 1424],
    'Pzas Habilitadas': [10456, 11644, 11544, 1100],
    'Pzas Ubicadas': [6851, 6796, 12598, 5224]
}
df = pd.DataFrame(data)

# Paleta de colores corporativa solicitada
COLOR_INGRESOS = "#112233"  # Azul marino muy oscuro (Background/Accent principal)
COLOR_HABILITADAS = "#4A5568"  # Gris oscuro
COLOR_UBICADAS = "#2B6CB0"  # Azul corporativo medio para destacar el flujo final

# 2. Renderizar Gráfico de Barras Comparativo por Actividad
fig = go.Figure()

fig.add_trace(go.Bar(
    x=df['Semana'],
    y=df['Total Ingresos'],
    name='Piezas Ingresadas Total',
    marker_color=COLOR_INGRESOS
))

fig.add_trace(go.Bar(
    x=df['Semana'],
    y=df['Pzas Habilitadas'],
    name='Piezas Habilitadas',
    marker_color=COLOR_HABILITADAS
))

fig.add_trace(go.Bar(
    x=df['Semana'],
    y=df['Pzas Ubicadas'],
    name='Piezas Ubicadas (Reubicadas)',
    marker_color=COLOR_UBICADAS
))

fig.update_layout(
    barmode='group',
    title_text='Flujo de Volumen Operativo por Semana',
    title_font_size=18,
    hovermode='x unified',
    plot_bgcolor='white',
    paper_bgcolor='white',
    legend=dict(orient="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
    margin=dict(t=100, b=50, l=50, r=50)
)

fig.update_yaxes(showgrid=True, gridcolor='#E2E8F0', title_text="Número de Piezas")
fig.update_xaxes(title_text="Periodo Operativo")

# 3. Layout en Streamlit
col1, col2 = st.columns([3, 1])

with col1:
    st.plotly_chart(fig, use_container_width=True)

with col2:
    st.markdown("#### KPIs Clave del Periodo")
    total_procesado = df['Total Ingresos'].sum()
    total_ubicado = df['Pzas Ubicadas'].sum()
    
    st.metric("Total Ingresos Acumulado", f"{total_procesado:,} pzas")
    st.metric("Total Ubicado en Piso", f"{total_ubicado:,} pzas")
    st.metric("Eficiencia de Salida Global", f"{round((total_ubicado/total_procesado)*100, 1)}%")
