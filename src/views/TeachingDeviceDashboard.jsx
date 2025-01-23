import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
  useTheme,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

// Dữ liệu mẫu
const overviewData = [
  { title: 'Tổng số thiết bị đã mượn', value: 150, color: '#1976d2' },
  { title: 'Thiết bị đang sử dụng', value: 120, color: '#4caf50' },
  { title: 'Thiết bị đã trả', value: 20, color: '#ff9800' },
  { title: 'Thiết bị hỏng hóc', value: 10, color: '#f44336' },
];

const pieData = [
  { name: 'Đang sử dụng', value: 120 },
  { name: 'Đã trả', value: 20 },
  { name: 'Hỏng hóc', value: 10 },
];

const usageData = [
  { day: 'Mon', devices: 20 },
  { day: 'Tue', devices: 25 },
  { day: 'Wed', devices: 30 },
  { day: 'Thu', devices: 35 },
  { day: 'Fri', devices: 40 },
  { day: 'Sat', devices: 38 },
  { day: 'Sun', devices: 28 },
];

const TeachingDevicesDashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: '1.25rem' }}
          >
            Dashboard Quản lý Thiết bị Giảng dạy
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {/* Overview Section */}
        <Grid container spacing={2}>
          {overviewData.map((data, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: 'center', bgcolor: '#f5f5f5' }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ color: data.color, fontWeight: 'bold', fontSize: '1.5rem' }}
                  >
                    {data.value}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    {data.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Charts Section */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title="Trạng thái thiết bị giảng dạy"
                titleTypographyProps={{
                  align: 'center',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <PieChart width={300} height={300}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0 ? '#4caf50' : index === 1 ? '#ff9800' : '#f44336'
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    wrapperStyle={{
                      marginTop: 10,
                      fontSize: '0.75rem',
                    }}
                  />
                </PieChart>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title="Số lượng thiết bị sử dụng theo ngày"
                titleTypographyProps={{
                  align: 'center',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <LineChart width={400} height={250} data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                  <Line
                    type="monotone"
                    dataKey="devices"
                    stroke="#1976d2"
                    strokeWidth={2}
                  />
                </LineChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TeachingDevicesDashboard;
