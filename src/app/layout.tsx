'use client';
import "../styles/globals.css";

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AppHeader from "./ui/header/AppHeader";
import Alert from "./ui/alert/alert";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Provider store={store}>
      <PersistGate loading={<html><body></body></html>} persistor={persistor}>
        <ApolloProvider client={client}>
          <AppHeader />
          <body className={`antialiased`}>
            <div className="p-4">{children}</div>
          </body>
          <Alert />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
