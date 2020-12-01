import styled from 'styled-components'

export const DivLabel= styled.div`
  cursor: pointer;

  span {
    visibility: hidden;
    transition: all .3s ease-in-out;

    :hover{
      visibility: visible;
    }
  }
`

export const LabelContent = styled.label`
  transition: all .3s ease-in-out;
  font-weight: ${props => props.fontWeight ? props.fontWeight : 400};
  font-size: ${props => props.fontSize ? props.fontSize : 12 };

  :hover {
    border-left: 1px solid #555555;
    border-bottom: 1px dashed #555555;
  }
`