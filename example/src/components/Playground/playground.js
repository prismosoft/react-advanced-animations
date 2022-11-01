import React from 'react'
import AnimationComponent, { TimingFunctionItems, DirectionItems, FillModeItems, AnimationTypesGrouped } from 'react-easy-animations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import Select from '../atoms/selectMenu'
import RoundButton from '../atoms/roundButton'
import RangeController from '../atoms/rangeController'
import Checkbox from '../atoms/checkbox'
import CodeContainer from '../atoms/codeContainer'

const Text = "react-easy-animations"
const Letters = Text.split("")

const Playground = () => {

  const [ counter, setCounter ] = React.useState(0)

  const [ animationObject, setAnimationObject ] = React.useState("object")
  const [ animationType, setAnimationType ] = React.useState("blur")
  const [ isIterationDisabled, setIsIterationDisabled ] = React.useState(false)
  const [ duration, setDuration ] = React.useState(1000)
  const [ delay, setDelay ] = React.useState(0)
  const [ interval, setInterval ] = React.useState(100)
  const [ iterationCount, setIterationCount ] = React.useState(5)
  const [ timingFunction, setTimingFunction ] = React.useState("ease")
  const [ direction, setDirection ] = React.useState("normal")
  const [ fillMode, setFillMode ] = React.useState("none")

  const handleIterationDisable = () => {
    setIsIterationDisabled(!isIterationDisabled)
    if(isIterationDisabled) {
      setIterationCount(5)
    } else {
      setIterationCount("infinite")
    }
  }

  const handleSelectType = (event) => {
    setAnimationType(event.target.value)
  }

  const handleReplay = () => {
    setCounter(counter + 1)
  }

  return (
    <PlaygroundContainer className="playground">

      <FormContainer className="playground_form">
        <StyledForm>
          <Select items={['object', 'letters', 'multiline']} label="presences" handleSelect={(event) => setAnimationObject(event.target.value)} />
          <RangeController
            label="duration"
            initialValue={duration}
            min={500}
            max={2000}
            step={100}
            unit="ms"
            onChange={(event) =>setDuration(event.target.value)}
          />
          {
            animationObject === "object" &&
            <RangeController
              label="delay"
              initialValue={0}
              min={0}
              max={20}
              step={1}
              unit="s"
              onChange={(event) => setDelay(event.target.value)}
            />
          }

          {
            animationObject === "letters" &&
            <RangeController
              label="delay of each letter"
              initialValue={100}
              min={100}
              max={2000}
              step={100}
              unit="ms"
              onChange={(event) => setInterval(event.target.value)}
            />
          }


          <RowContainer>
            <RangeController
              label="iteration"
              disabled={isIterationDisabled}
              min={1}
              max={20}
              step={1}
              unit=""
              initialValue={iterationCount}
              optionalValue={isIterationDisabled ? "infinite" : undefined}
              onChange={(event) => setIterationCount(event.target.value)}
            />
            <Checkbox label="infinite" onClick={handleIterationDisable} />
          </RowContainer>
          <Select
            items={TimingFunctionItems}
            label="timing-function"
            handleSelect={(event) => setTimingFunction(event.target.value)}
          />
          <Select items={DirectionItems} label="direction" handleSelect={(event) => setDirection(event.target.value)} />
          <Select items={FillModeItems} label="fill-mode" handleSelect={(event) => setFillMode(event.target.value)}  />
        </StyledForm>
        <CodeContainer
          animationObject={animationObject}
          animationType={animationType}
          duration={duration}
          delay={delay}
          direction={direction}
          timingFunction={timingFunction}
          iterationCount={iterationCount}
          fillMode={fillMode}
          interval={interval}
        />

      </FormContainer>


      <ResultContainer className="resultContainer">

        <ResultField>
          {
            animationObject === "object" &&
              <AnimationComponent
                key={counter}
                type={animationType}
                duration={`${duration}ms`}
                delay={`${delay}s`}
                direction={direction}
                timing={timingFunction}
                iteration={iterationCount}
                fillMode={fillMode}
              >{Text}
              </AnimationComponent>
          }

          {
            animationObject === "letters" &&
            <LettersContainer key={counter}>
                {
                  Letters.map((item, index) =>
                  <AnimationComponent
                    type={animationType}
                    duration={`${duration}ms`}
                    delay={`${index * interval}ms`}
                    direction={direction}
                    timing={timingFunction}
                    iteration={iterationCount}
                    fillMode={fillMode}
                    key={index}>
                    {item}
                  </AnimationComponent>)
                }
              </LettersContainer>
          }

          {
            animationObject === "multiline" &&
            <AnimationComponent
              type="typewriter"
              dataText={[
                'Sushi',
                'Pizza',
                'Brötchen',
                'Salat'
              ]}
              cursorColor="#2196f3"
            />
          }



        </ResultField>


        <EffectController>
          <Select
            hasOptGroup={animationObject !== 'multiline'}
            items={animationObject === 'multiline' ? ['typewriter'] : AnimationTypesGrouped}
            width="400px"
            height="45px"
            fontSize="1.25rem"
            handleSelect={handleSelectType}
          />

          <RoundButton title={"replay animation"} onClick={handleReplay}>
            <FontAwesomeIcon icon={faRedo} />
          </RoundButton>
        </EffectController>
      </ResultContainer>

    </PlaygroundContainer>
  )
}

const PlaygroundContainer = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 230px);
  padding: 0px 100px;
`
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  min-width: 300px;
  height: calc(100vh - 230px);
  z-index: 10;
  padding: 25px 0;
`
const StyledForm = styled.form`
  position: relative;
  width: 100%;
  border-radius: 3px;
  margin-bottom: 0;
`
const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
const ResultContainer = styled.div`
  display: flex;
  height: 100%;
  width: calc(100vw - 400px);
  min-width: 600px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`
const ResultField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 500px;
  background-color: initial;
  font-size: calc(0.6rem + 4vmax);
  font-weight: 100;
  letter-spacing: -2;
  color: ${props => props.theme.colors.primary};
`
const LettersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EffectController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`


export default Playground
