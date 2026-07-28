export default function StudentDashboard() {
  console.log("StudentDashboard rendered");

  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching profile...");

    getMyProfile()
      .then((data) => {
        console.log("Profile response:", data);
        setStudent(data.student);
      })
      .catch((err) => {
        console.error("Profile error:", err);
        setError(
          err.response?.data?.message || "Could not load your profile."
        );
      })
      .finally(() => {
        console.log("Finished loading");
        setLoading(false);
      });
  }, []);