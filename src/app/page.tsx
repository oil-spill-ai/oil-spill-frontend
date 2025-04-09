import Earth from '../components/Earth';
import FileUpload from '../components/FileUpload'

const Home: React.FC = () => {
    return (
        <div>
            <main className="relative h-screen">
                <Earth />
                <div className="absolute inset-0 z-10">
                    <FileUpload />
                </div>
            </main>
        </div>
    );
};

export default Home;