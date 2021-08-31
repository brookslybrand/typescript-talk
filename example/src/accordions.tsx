import React, { useState } from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useFormsState, useFormsDispatch, FormObject } from "./forms-context";

function Accordions() {
  const forms = useFormsState();

  return (
    <>
      {forms.map((form) => (
        <CustomAccordion key={form.id} {...form} />
      ))}
    </>
  );
}

const CustomAccordion = React.memo(
  ({ id, firstName, lastName, email }: FormObject) => {
    const [expanded, setExpanded] = useState(true);
    const formsDispatch = useFormsDispatch();

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
              onChange={(e) =>
                formsDispatch({
                  type: "SET_FIRST_NAME",
                  id,
                  firstName: e.target.value,
                })
              }
            />
            <br />
            <span>Last name:</span>
            <br />
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) =>
                formsDispatch({
                  type: "SET_LAST_NAME",
                  id,
                  lastName: e.target.value,
                })
              }
            />
            <br />
            <span>email:</span>
            <br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) =>
                formsDispatch({
                  type: "SET_EMAIL",
                  id,
                  email: e.target.value,
                })
              }
            />
          </form>
        </AccordionDetails>
      </Accordion>
    );
  }
);

export default Accordions;
