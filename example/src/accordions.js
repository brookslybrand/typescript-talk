import React, { useState, memo } from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  useFormsState,
  useFormsDispatch,
  setFirstName,
  setLastName,
  setEmail,
} from "./forms-context";

const Accordions = () => {
  const forms = useFormsState();

  return forms.map((form) => <CustomAccordion key={form.id} {...form} />);
};

const CustomAccordion = memo(({ id, firstName, lastName, email }) => {
  const [expanded, setExpanded] = useState(true);
  const formsDispatch = useFormsDispatch();

  const handleSetFirstName = (firstName) =>
    formsDispatch(setFirstName(id, firstName));

  const handleSetLastName = (lastName) =>
    formsDispatch(setLastName(id, lastName));

  const handleSetEmail = (email) => formsDispatch(setEmail(id, email));

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prevExpanded) => !prevExpanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${id}-content`}
      >
        <span>Form {id}</span>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <form onSubmit={(e) => e.preventDefault()}>
          <span>First name:</span>
          <br />
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => handleSetFirstName(e.target.value)}
          />
          <br />
          <span>Last name:</span>
          <br />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => handleSetLastName(e.target.value)}
          />
          <br />
          <span>email:</span>
          <br />
          <input
            type="email"
            name="lastName"
            value={email}
            onChange={(e) => handleSetEmail(e.target.value)}
          />
        </form>
      </AccordionDetails>
    </Accordion>
  );
});

export default Accordions;
