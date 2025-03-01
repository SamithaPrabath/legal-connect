import { UserInfoResponse, UserStatus, UserType } from "@type/User";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientProfile from "./ClientProfile";
import LawyerProfile from "./LawyerProfile";

const Profile = () => {
    const [profile, setProfile] = useState<UserInfoResponse | null>(null);

  const params = useParams();
  const clientProfile: UserInfoResponse = {
    profileId: 1234,
    userStatus: UserStatus.AVAILABLE,
    type: UserType.CLIENT,
    basicInfo: {
      firstName: "Thushara",
      lastName: "Dilshan",
      city: "New York",
      location: "New York",
      image: null,
      language: "English",
      occupation: "Software Engineer",
    },
    contactInfo: {
      email: "thushara.abeykoon99@gmail.com",
      address: "No 12, Colombo Road, New York",
      phone: "0712345678",
    },
    about: null,
  };

  const lawyerProfile: UserInfoResponse = {
    profileId: 1234,
    type: UserType.LAWYER,
    userStatus: UserStatus.AVAILABLE,
    rating: 4.5,
    reviewCount: 230,
    basicInfo: {
      firstName: "Thushara",
      lastName: "Dilshan",
      city: "New York",
      location: "New York",
      image: null,
      language: "English",
      occupation: "Software Engineer",
    },
    contactInfo: {
      email: "thushara.abeykoon99@gmail.com",
      address: "No 12, Colombo Road, New York",
      phone: "0712345678",
    },
    about: {
      bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, deserunt reiciendis reprehenderit architecto dolores, ullam minus labore pariatur hic adipisci earum, molestias dolor similique. Possimus voluptas sed molestias facilis fuga similique rerum, consequatur quaerat laborum pariatur voluptatem, quae vel iusto laboriosam porro libero reiciendis distinctio deserunt dolores neque fugiat corporis. Eligendi, culpa qui est modi dolorem commodi cum ab ea nulla perspiciatis eos velit vero quia! Dolores, minima excepturi. Perferendis animi exercitationem rerum non ipsa sed, reprehenderit nisi eius assumenda molestias tempore qui obcaecati deserunt laboriosam quo explicabo tempora eum voluptas? Cumque iusto, exercitationem sequi veritatis asperiores rem eos blanditiis!",
      credentialsAndEducation:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid unde vel quidem doloremque, doloribus temporibus similique ex sit, at cumque vitae iusto alias voluptates ipsum deserunt officiis. Earum ex non hic repellat totam commodi deserunt. Quia magni consequatur quasi recusandae ad suscipit repudiandae a illo! Animi dolore nihil doloribus! Numquam facere atque animi commodi officia, consequuntur fugiat nesciunt iusto, nam est sunt cum maxime! Debitis recusandae quos cum? Laboriosam culpa voluptatibus ipsum, blanditiis odio deleniti error facilis earum dolores architecto! Ratione nulla expedita quas adipisci minima suscipit ipsa? Velit consequuntur perferendis aut suscipit tempore aperiam at repudiandae facilis illum sequi.",
      practiceAreas: ["Hoekey", "Circket", "Volleyball"],
      workHistory:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum adipisci laudantium recusandae, in cumque odit beatae. Ut ratione magni natus laboriosam molestias itaque, officiis sed adipisci, officia sit maxime fugiat vitae error blanditiis. Eaque ipsum quis, sunt aliquid numquam quidem natus dignissimos enim suscipit at dolores esse laborum nam earum!",
    },
  };

  useEffect(() => {}, [params.profileId]);

  useEffect(() => {
    setProfile(lawyerProfile);
  },[])

  if (!profile) return null;
  else if (profile.type === UserType.LAWYER) return <LawyerProfile userData = {profile} />
  else if (profile.type = UserType.CLIENT) return <ClientProfile userData={profile} />
  else return null;
};

export default Profile;
