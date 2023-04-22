import postitimg from '../../assets/postit1.png'
import './PostIts.css'

function PostIts (props) {
    return (
        <>
            <div class="postitscontainer">
                <div class="colorcontainer">
                    <p class="postitmessage">message</p>
                </div>
                <img class="postits" src={postitimg}></img>
            </div>
        </>
    )
}
export default PostIts