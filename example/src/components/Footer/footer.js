import React from 'react'
import styled from 'styled-components'
import Animation from 'react-easy-animations'
import ExternalLink from '../atoms/externalLink'

const Footer = () => {
  return (
    <FooterContainer>
      Made with
      <Animation
        type="flipHorizontal"
        iteration="infinite"
        duration="2000ms"
        timing="linear"
        style={{margin: "0px 10px", color:"white"}}>
        ❤
      </Animation>
       by <ExternalLink href="https://prismosoft.com" target="_blank" margin="0px 10px" color="#ffffff" >PrismoSoft</ExternalLink> using React and styled-components
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 40px;
  font-size: .8rem;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.secondary};
`

export default Footer
