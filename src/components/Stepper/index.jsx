import {
  Box,
  Stepper as ChakraStepper,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
} from "@chakra-ui/react";

const Stepper = ({ steps, activeStep }) => {
  return (
    <ChakraStepper index={activeStep} display={{ base: "none", md: "flex" }}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </ChakraStepper>
  );
};

export default Stepper;
