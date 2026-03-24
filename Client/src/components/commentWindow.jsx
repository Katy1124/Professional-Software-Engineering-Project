import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/commentWindow.css';
import { logsApi } from '../api/logs.api';
export default function CommentWin({onClose, ticketId}) {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const allLogs = await logsApi.list();
                const filtered = allLogs.filter(log =>
                    log.ticket_Id == ticketId &&
                    log.description.includes('[COMMENT]')
                );
                setLogs(filtered);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [ticketId]);

    const formatDate = (dateNum) => {
    if (!dateNum) return "No Date";
    const dateStr = String(dateNum);

    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);

    return `${day}/${month}/${year}`;
};

    return(
        <div className="modal d-block" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Comment Thread</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
                {logs.length > 0 ? (
                    logs.map((log) => (
                        <div key={log.id} className="mb-3 p-2 border-bottom border-secondary">
                            <div className="d-flex justify-content-between">
                                <small className="text-info">Admin Note</small>
                                <small className="text-muted">{formatDate(log.date)}</small>
                            </div>
                            <p className="mt-1">
                                {log.description.replace('[COMMENT]', '').trim()}
                            </p>
                        </div>
                    ))
                ): (
                    <p className="text-center text-muted">No comments found.</p>
                )}
            </div>
            </div>
        </div>
        </div>
    )
}
