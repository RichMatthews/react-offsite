import {
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis'

import React from 'react'
import styled from 'styled-components'

const GraphContainer = styled.div``

class Graph extends React.Component {
  render() {
    let data123 = []
    let timestamp2 = new Date(1548102612420).getTime()
    const ONE_DAY = 86400000

    if (this.props.currentExercise.previousWeights) {
      const data = this.props.currentExercise.previousWeights
      data.forEach(d => {
        const timestamp = new Date(d.date).getTime()
        data123.push({ x: timestamp, y: d.weight })
      })
    }

    return this.props.currentExercise ? (
      <GraphContainer>
        <XYPlot
          xDomain={[timestamp2, timestamp2 + 100 * ONE_DAY]}
          yDomain={[0, 100]}
          xType="time"
          width={350}
          height={250}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
            data={data123}
            style={{ stroke: 'red', strokeWidth: 3, fill: 'none' }}
          />
        </XYPlot>
      </GraphContainer>
    ) : null
  }
}

export default Graph
