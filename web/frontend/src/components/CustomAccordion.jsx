import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const CustomAccordion = ({title, children}) => {
  return (
    <Accordion sx={{boxShadow: "none"}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="primary"/>}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

export default CustomAccordion;