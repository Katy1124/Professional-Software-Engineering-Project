import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/quoteOptions.css';
import { quotesApi } from '../api/quotes.api';
import { ticketsApi } from '../api/tickets.api';

export default function OptionWin({onClose, ticket, onStatusUpdated, showToast}) {
    const [loading, setLoading] = useState(false);

    const updateStatus = async (newStatus) => {
        if (!ticket) return;
        setLoading(true);
        try{
            await ticketsApi.update(ticket.id, {
                ...ticket,
                status: newStatus
            });
            onStatusUpdated(newStatus);

            const msg = newStatus === 'rj' ? 'Quote Rejected' : 'Change Requested';
            showToast(msg);
            onClose();
        } catch (err) {
            showToast(err.message || 'Update failed', false);
        } finally {
            setLoading(false);
        }
    }
    return(
        <div className="modal d-block" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Reject/Request Changes</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
                <button className='change-btn'
                onClick={() => updateStatus('qp')}
                disabled={loading}>
                    Request Changes
                </button>
                <button className='reject-btn'
                onClick={() => updateStatus('rj')}
                disabled={loading}>
                    Reject
                </button>
            </div>
            </div>
        </div>
        </div>
    )
}
