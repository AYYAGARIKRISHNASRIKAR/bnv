const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fs = require('fs');

const exportToCSV = async (users) => {
  const csvDir = path.join(__dirname, '..', 'temp');
  if (!fs.existsSync(csvDir)) {
    fs.mkdirSync(csvDir, { recursive: true });
  }

  const csvPath = path.join(csvDir, 'users.csv');
  
  const csvWriter = createCsvWriter({
    path: csvPath,
    header: [
      { id: '_id', title: 'ID' },
      { id: 'firstName', title: 'First Name' },
      { id: 'lastName', title: 'Last Name' },
      { id: 'email', title: 'Email' },
      { id: 'phone', title: 'Phone' },
      { id: 'gender', title: 'Gender' },
      { id: 'status', title: 'Status' },
      { id: 'location', title: 'Location' },
      { id: 'profileImage', title: 'Profile Image' },
      { id: 'createdAt', title: 'Created At' },
      { id: 'updatedAt', title: 'Updated At' }
    ]
  });

  const records = users.map(user => ({
    ...user._doc,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  }));

  await csvWriter.writeRecords(records);
  return csvPath;
};

module.exports = { exportToCSV };