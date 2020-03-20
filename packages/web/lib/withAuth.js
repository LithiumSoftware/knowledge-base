import React from "react";
import Router from "next/router";
import { auth, redirect, logout } from "./useAuth";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || "Component";

export const withAuth = ({ requiredRoles } = {}) => WrappedComponent =>
  class extends React.Component {
    state = {
      user: null
    };

    static displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

    static getLayout = WrappedComponent.getLayout;

    static async getInitialProps(ctx) {
      const signedIn = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      if (!signedIn) {
        redirect({ ctx, uri: "/" });
      }

      return { ...componentProps };
    }

    render() {
      return <WrappedComponent {...this.props} logout={logout} />;
    }
  };

export default withAuth;
