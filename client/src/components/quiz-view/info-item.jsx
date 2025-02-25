const InfoItem = ({ icon: Icon, text }) => (
  <div className="flex items-center text-gray-300">
    <Icon className="h-5 w-5 mr-2 text-blue-400" />
    <span>{text}</span>
  </div>
);

export default InfoItem;
