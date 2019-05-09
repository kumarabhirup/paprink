import React from 'react'
import styled from 'styled-components'

const BlackBack = styled.div`
	top: 0;
	left: 0;
	width: 100%;
	height: 400px;
  background: black;
`

const Content = styled.div`
	top: 59%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	-moz-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	-o-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	max-width: 440px;
	text-align: center;
  font-size: 40px;
`

const MiniTitle = ({ children }) => { 
  return (
    <BlackBack>
      <Content>
        { children }
      </Content>
    </BlackBack>
  )
}

export default MiniTitle