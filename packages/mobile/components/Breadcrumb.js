import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import styled from "styled-components";
import { View } from "react-native";

const StyledView = styled(View)`
  flex-direction: row;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
`;

const StyledButton = styled(Button)`
  min-width: 0;
  margin: 0;
`;

const useBreadcrumb = () => {
  const [expanded, setExpanded] = useState(false);

  const open = () => setExpanded(true);

  return {
    expanded,
    open
  };
};

const BreadcrumbItem = ({ title, action }) => (
  <StyledButton onPress={action}>{title}</StyledButton>
);

const BreadcrumbSeparator = ({ separator }) => <Text>{separator}</Text>;

const BreadcrumbCollapser = ({ onPress }) => (
  <StyledButton icon="dots-horizontal" onPress={onPress} />
);

const Breadcrumb = ({ separator, collapse = {}, items }) => {
  const { expanded, open } = useBreadcrumb();

  let breadcrumb = items.map(({ title, action }) => (
    <BreadcrumbItem title={title} action={action} />
  ));

  const { itemsBefore = 1, itemsAfter = 1, max = 4 } = collapse;

  const totalItems = breadcrumb.length;
  const lastIndex = totalItems - 1;

  breadcrumb = breadcrumb.reduce((acc, child, index) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(child, <BreadcrumbSeparator separator={separator} />);
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  if (!expanded || totalItems <= max) {
    breadcrumb = [
      ...breadcrumb.slice(0, itemsBefore),
      <BreadcrumbCollapser onPress={open} />,
      ...breadcrumb.slice(totalItems - itemsAfter, totalItems)
    ];
  }

  return <StyledView>{breadcrumb}</StyledView>;
};

export default Breadcrumb;
