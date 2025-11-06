import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*/ src/main.tsx

import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css"; //

// --- LAYOUTS ---
// O 'App' é o seu Layout do Admin, que já existe
import App from "./App.tsx"; 
// 'AlunoLayout' é o novo Layout do Aluno, que vamos criar no Passo 2
import { AlunoLayout } from "./AlunoLayout.tsx"; 

// --- PÁGINAS DO ALUNO ---
// Vamos criar todas estas páginas dentro da sua pasta 'src/components/'
import { StudentDashboardPage } from "./components/StudentDashboardPage";
import { ExplorarTrilhasPage } from "./components/ExplorarTrilhasPage";
import { TrilhaDetalhePage } from "./components/TrilhaDetalhePage";
import { CriarTrilhaIAPage } from "./components/CriarTrilhaIAPage";
import { ChatAlunoPage } from "./components/ChatAlunoPage";

// --- PÁGINAS DE AUTENTICAÇÃO ---
// (Importe aqui suas páginas de Login/Cadastro. 
// Estou assumindo que elas estão em 'src/components/')
// import { LoginPage } from "./components/LoginPage"; 
// import { CadastroPage } from "./components/CadastroPage";

// --- Definição das Rotas ---
const router = createBrowserRouter([
  {
    // --- ROTAS DO ALUNO ---
    // Todas as rotas aqui dentro usarão o AlunoLayout (Passo 2)
    path: "/",
    element: <AlunoLayout />,
    children: [
      // Redireciona a rota raiz "/" para "/dashboard"
      {
        index: true, 
        element: <Navigate to="/dashboard" replace /> 
      },
      {
        path: "dashboard", // Rota: /dashboard
        element: <StudentDashboardPage />, // (Passo 4.1)
      },
      {
        path: "explorar", // Rota: /explorar
        element: <ExplorarTrilhasPage />, // (Passo 4.2)
      },
      {
        path: "trilha/:id", // Rota: /trilha/1, /trilha/2, etc.
        element: <TrilhaDetalhePage />, // (Passo 4.3)
      },
      {
        path: "criar-trilha", // Rota: /criar-trilha
        element: <CriarTrilhaIAPage />, // (Passo 4.4)
      },
      {
        path: "chat", // Rota: /chat
        element: <ChatAlunoPage />, // (Passo 4.5)
      },
    ],
  },
  {
    // --- ROTA DO ADMIN ---
    // A rota /admin usa o seu App.tsx original (com Sidebar)
    path: "/admin",
    element: <App />, // Seu App.tsx já cuida das sub-rotas
  },
  // {
  //   // --- ROTAS DE AUTENTICAÇÃO ---
  //   // (Descomente e ajuste o caminho para onde sua página de Login está)
  //   path: "/login",
  //   // element: <LoginPage />, 
  // },
  // {
  //   path: "/cadastro",
  //   // element: <CadastroPage />,
  // },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
); */