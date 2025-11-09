import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


/*import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout e páginas do aluno
import { AlunoLayout } from "./AlunoLayout";
import { StudentDashboardPage } from "./components/StudentDashboardPage";
import { ExplorarTrilhasPage } from "./components/ExplorarTrilhasPage";
import { CriarTrilhaIAPage } from "./components/CriarTrilhaIAPage";
import { TrilhaDetalhePage } from "./components/TrilhaDetalhePage";
import { ChatAlunoPage } from "./components/ChatAlunoPage";

// Estilos globais
import "./index.css";
import "./styles/globals.css";

// Define as rotas do aluno
const router = createBrowserRouter([
  {
    path: "/",
    element: <AlunoLayout />,
    children: [
      { path: "/", element: <StudentDashboardPage /> },
      { path: "/dashboard", element: <StudentDashboardPage /> },
      { path: "/explorar", element: <ExplorarTrilhasPage /> },
      { path: "/criar-trilha", element: <CriarTrilhaIAPage /> },
      { path: "/trilha/:id", element: <TrilhaDetalhePage /> },
      { path: "/chat", element: <ChatAlunoPage /> },
    ],
  },
]);

// Renderiza o painel do aluno
createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
*/