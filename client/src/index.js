import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import CrewMemberList from './components/CrewMemberList';



ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/:movieId/crewMembers" element={<CrewMemberList />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);


