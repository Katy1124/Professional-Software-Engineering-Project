import { useState, useEffect } from 'react';
import { ticketsApi } from '../api/tickets.api';
import { quotesApi } from '../api/quotes.api';
import { logsApi } from '../api/logs.api';

// src/utils/quoteLogic.js

export const SEV_MULT = { 1: 1.0, 2: 1.25, 3: 1.6, 4: 2.0 };
export const IMPACT_MULT = { 1: 1.0, 2: 1.15, 3: 1.35, 4: 1.6 };
export const BASE_RATE = { E: 65, I: 85, S: 55 };

export const RES_HOURS = {
  E: { 1: 8,  2: 12, 3: 20, 4: 32 },
  I: { 1: 2,  2: 4,  3: 8,  4: 16 },
  S: { 1: 4,  2: 6,  3: 10, 4: 18 },
};

export const ROLE_SPLIT = {
  E: { BA: 0.05, QA: 0.50, Architect: 0.00, Developer: 0.45 },
  I: { BA: 0.02, QA: 0.20, Architect: 0.00, Developer: 0.78 },
  S: { BA: 0.10, QA: 0.10, Architect: 0.00, Developer: 0.80 },
};

export const normType = (t = '') => {
  const u = String(t).trim().toUpperCase();
  if (u === 'E' || u === 'ENHANCEMENT') return 'E';
  if (u === 'I' || u === 'INCIDENT') return 'I';
  return 'S';
};

export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, Number(v) || lo));

export const calculateAutoValues = (ticket) => {
  if (!ticket) return { resHrs: 0, rate: 0 };

  const type = normType(ticket.type);
  const sev = clamp(ticket.severity || 1, 1, 4);
  const impact = clamp(ticket.technical_Diffculty || 1, 1, 4);

  const resHrs = (RES_HOURS[type] ?? RES_HOURS.S)[sev];
  const rate = +(BASE_RATE[type] * SEV_MULT[sev] * IMPACT_MULT[impact]).toFixed(2);

  return { 
    resHrs, 
    rate, 
    baseRate: BASE_RATE[type], 
    type, 
    sev, 
    impact 
  };
};

export const fmt = (n) => `£${Number(n).toFixed(2)}`;
export const fmtH = (n) => `${Number(n).toFixed(1)}h`;