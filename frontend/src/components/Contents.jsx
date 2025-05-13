const Content = () => {
    return (
        <div className="flex-1 p-4">
            <h2 className="text-xl font-bold mb-4">What's Happening</h2>
            <div className="border p-4 rounded-lg">
                <p>You get to bring back one map to the VALORANT competitive map pool. What are you choosing?</p>
                <ul className="mt-2 space-y-1">
                    <li>- Fracture</li>
                    <li>- Pearl</li>
                    <li>- Split</li>
                    <li>- Breeze</li>
                </ul>
                <div className="mt-4 flex space-x-4">
                    <span> 2.9K</span>
                    <span> Reply</span>
                    <span> Share</span>
                </div>
            </div>
        </div>
    );
};

export default Content