import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AlunoLayout } from "./AlunoLayout";
import { StudentDashboardPage } from "./components/StudentDashboardPage";
import { ExplorarTrilhasPage } from "./components/ExplorarTrilhasPage";
import { CriarTrilhaIAPage } from "./components/CriarTrilhaIAPage";
import { TrilhaDetalhePage } from "./components/TrilhaDetalhePage";
import { ChatAlunoPage } from "./components/ChatAlunoPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Layout principal do aluno */}
        <Route path="/" element={<AlunoLayout />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="explorar" element={<ExplorarTrilhasPage />} />
          <Route path="criar-trilha" element={<CriarTrilhaIAPage />} />
          <Route path="trilha/:id" element={<TrilhaDetalhePage />} />
          <Route path="chat" element={<ChatAlunoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
