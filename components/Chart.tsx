import Plot from 'react-plotly.js';

interface Props {
  x: any[],
  y: any[],
  title: string
}

export default function Header({x, y, title}: Props): JSX.Element {

  return (
    <>

      <Plot
        layout={{
          title: {
            text: title,
            font: {
              family: 'Courier New, monospace',
              size: 24
            },
            xref: 'paper',
            x: 0.05,
          }
        }}

        data={
          [
            {
              x: x,
              y: y,
              type: 'scatter',
              mode: 'lines',
              marker: { color: 'red' },
            }
          ]
        }
        style={{ width: '100%' }}
      />
    </>
  );
}