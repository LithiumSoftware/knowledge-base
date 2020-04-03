import React, { useState } from "react";

import { generatedGraphQL } from "@workspace-library/core";

const SidebarArticles = (props: any) => {
  const favourites: boolean = props?.initialParams?.favourites || false;

  console.log(generatedGraphQL);

  return null;
};

export default SidebarArticles;
