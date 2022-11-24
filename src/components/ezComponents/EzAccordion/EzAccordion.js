// material
import {Accordion, AccordionDetails, AccordionSummary, Divider, Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function EzAccordion({element, title, divider}) {
    // debugger
    const [expanded, setExpanded] = useState(false);
    const handleChange = (title) => (event, isExpanded) => {
        setExpanded(isExpanded ? title : false);
    };
    return (
        <RootStyle>
            <Accordion
                expanded={expanded === title}
                onChange={handleChange(title)}
                sx={{
                    '& .Mui-expanded': {
                        margin: '0 !important',
                    },
                    '& .MuiAccordionSummary-root.Mui-expanded': {
                        minHeight: '48px',
                        backgroundColor: theme => theme.palette.ecommerce.accordionExpanded,
                    }
                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{cursor: 'pointer'}}/>}
                    aria-controls={`${title} - content`}
                    id={title}
                    sx={{
                        backgroundColor: '#F7F8FAFF',
                        '& .Mui-expanded': {
                            margin: 0,
                        }
                    }}
                >
                    <Typography
                        variant='span'
                        sx={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#767193'
                        }}
                    >
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{
                    backgroundColor: '#F7F8FAFF',
                }}>
                    {element}
                </AccordionDetails>
            </Accordion>
            {divider && <Divider/>}
        </RootStyle>
    );
}