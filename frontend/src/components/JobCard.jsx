import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
    return (
        <div className="col-md-4">
            <div className="card p-3 mb-3 shadow-sm">
                <h5>{job.title}</h5>
                <p>{job.description}</p>
                <Link to={`/apply/${job._id}`} className="btn btn-primary">
                    Apply Now
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
