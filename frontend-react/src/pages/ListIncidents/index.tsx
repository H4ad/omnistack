//#region Imports

import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import Header from '../../components/Header';
import IncidentItem from '../../components/IncidentItem';
import { IncidentProxy } from '../../models/proxies/incident.proxy';
import { getIncidents } from '../../services/api';

import './styles.css';

//#endregion

/**
 * O componente que representa a página de listagem de incidentes
 *
 * @constructor
 */
export default function ListIncidents(history: any) {
  const ongId = history.match.params.id;

  //#region States

  const [error, setError] = useState('');
  const [listIncidents, setListIncidents] = useState<IncidentProxy[]>([]);

  //#endregion

  //#region Effects

  useEffect(() => {
    getIncidents(ongId).then(incidents => {
      if (typeof incidents === 'string')
        return void setError(incidents);

      setListIncidents(incidents);
    });
  }, []);

  //#endregion

  return (
    <div className="list--container">
      <Header actionButtonText="Cadastrar novo caso" actionRoute={ `/ongs/${ ongId }/incidents/create` }/>
      <div className="list--back">
        <a href="/ongs">
          <FiArrowLeft size={ 18 } color="#E02041"/>
          <span>Voltar para as ongs</span>
        </a>
      </div>
      <div className="list--body">
        <h1>Casos cadastrados</h1>
        <h3 className="form--error">{ error }</h3>
        <div className="list--body--grid">
          { listIncidents.map(incident => {
            return (
              <IncidentItem { ...incident }/>
            );
          }) }
        </div>
      </div>
    </div>
  );
}
