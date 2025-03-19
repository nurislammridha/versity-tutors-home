import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from 'src/services/GlobalFunction';
import { GetDocumentByClientId } from '../_redux/ProfileAction';

const Documents = ({ clientId }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [isPdf, setPdf] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const isDocumentLoading = useSelector((state) => state.profileInfo.isDocumentLoading);
    const documentData = useSelector((state) => state.profileInfo.documentData);
    const handlePreview = (item) => {
        const url = item?.doc?.url
        const type = url.toLowerCase().endsWith('.pdf')
        setPdf(type)
        const secureUrl = url.replace('http://', 'https://'); // Force HTTPS
        setFileUrl(secureUrl)
        setShowModal(true)
    }
    useEffect(() => {
        if (clientId) {
            dispatch(GetDocumentByClientId(clientId))
        }
    }, [clientId])

    return (
        <>
            <h3 className='mt-5'>All Uploaded Document</h3>
            {!isDocumentLoading && documentData !== null && documentData.length > 0 ? (
                <table class="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Date</th>
                            <th scope="col">Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentData.map((item, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item?.title}</td>
                                <td>{formatDate(item?.createdAt)}</td>
                                <td><a className='btn btn-info btn-sm' onClick={() => handlePreview(item)}>Preview</a></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<div>No data found</div>)
            }
            {/* Preview Modal */}
            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1" onClick={() => setShowModal(false)}>
                    <div className="modal-dialog modal-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">File Preview</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
                            </div>
                            <div className="modal-body" style={{ height: '80vh' }}>
                                {isPdf ? (
                                    <iframe
                                        src={fileUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 'none' }}
                                    />
                                ) : (
                                    <img
                                        src={fileUrl}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Documents