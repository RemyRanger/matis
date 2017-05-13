var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require('fs');
var busboy = require('connect-busboy');
const net = require('net');
var concat = require('concat');
var http = require('http');

//Connection With C server ---------------------------------------------------------------------------------------------------------------------------------
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  var model = 'deg-1,deg-2,deg-3,deg-4,deg-5,deg-6,deg-7,deg-8,deg-9,deg-10,deg-11,deg-12,deg-13,deg-14,deg-15,deg-16,deg-17,deg-18,deg-19,deg-20,deg-21,deg-22,deg-23,deg-24,deg-25,deg-26,deg-27,deg-28,deg-29,deg-30,deg-31,deg-32,deg-33,deg-34,deg-35,deg-36,deg-37,deg-38,deg-39,deg-40,deg-41,deg-42,deg-43,deg-44,deg-45,deg-46,deg-47,deg-48,deg-49,deg-50,deg-51,deg-52,deg-53,deg-54,deg-55,deg-56,deg-57,deg-58,deg-59,deg-60,deg-61,deg-62,deg-63,deg-64,deg-65,deg-66,deg-67,deg-68,deg-69,deg-70,deg-71,deg-72,deg-73,deg-74,deg-75,deg-76,deg-77,deg-78,deg-79,deg-80,deg-81,deg-82,deg-83,deg-84,deg-85,deg-86,deg-87,deg-88,deg-89,deg-90,deg-91,deg-92,deg-93,deg-94,deg-95,deg-96,deg-97,deg-98,deg-99,deg-100,deg-101,deg-102,deg-103,deg-104,deg-105,deg-106,deg-107,deg-108,deg-109,deg-110,deg-111,deg-112,deg-113,deg-114,deg-115,deg-116,deg-117,deg-118,deg-119,deg-120,deg-121,deg-122,deg-123,deg-124,deg-125,deg-126,deg-127,deg-128,deg-129,deg-130,deg-131,deg-132,deg-133,deg-134,deg-135,deg-136,deg-137,deg-138,deg-139,deg-140,deg-141,deg-142,deg-143,deg-144,deg-145,deg-146,deg-147,deg-148,deg-149,deg-150,deg-151,deg-152,deg-153,deg-154,deg-155,deg-156,deg-157,deg-158,deg-159,deg-160,deg-161,deg-162,deg-163,deg-164,deg-165,deg-166,deg-167,deg-168,deg-169,deg-170,deg-171,deg-172,deg-173,deg-174,deg-175,deg-176,deg-177,deg-178,deg-179,deg-180,deg-181,deg-182,deg-183,deg-184,deg-185,deg-186,deg-187,deg-188,deg-189,deg-190,deg-191,deg-192,deg-193,deg-194,deg-195,deg-196,deg-197,deg-198,deg-199,deg-200,deg-201,deg-202,deg-203,deg-204,deg-205,deg-206,deg-207,deg-208,deg-209,deg-210,deg-211,deg-212,deg-213,deg-214,deg-215,deg-216,deg-217,deg-218,deg-219,deg-220,deg-221,deg-222,deg-223,deg-224,deg-225,deg-226,deg-227,deg-228,deg-229,deg-230,deg-231,deg-232,deg-233,deg-234,deg-235,deg-236,deg-237,deg-238,deg-239,deg-240,deg-241,deg-242,deg-243,deg-244,deg-245,deg-246,deg-247,deg-248,deg-249,deg-250,deg-251,deg-252,deg-253,deg-254,deg-255,deg-256,deg-257,deg-258,deg-259,deg-260,deg-261,deg-262,deg-263,deg-264,deg-265,deg-266,deg-267,deg-268,deg-269,deg-270,deg-271,deg-272,deg-273,deg-274,deg-275,deg-276,deg-277,deg-278,deg-279,deg-280,deg-281,deg-282,deg-283,deg-284,deg-285,deg-286,deg-287,deg-288,deg-289,deg-290,deg-291,deg-292,deg-293,deg-294,deg-295,deg-296,deg-297,deg-298,deg-299,deg-300,deg-301,deg-302,deg-303,deg-304,deg-305,deg-306,deg-307,deg-308,deg-309,deg-310,deg-311,deg-312,deg-313,deg-314,deg-315,deg-316,deg-317,deg-318,deg-319,deg-320,deg-321,deg-322,deg-323,deg-324,deg-325,deg-326,deg-327,deg-328,deg-329,deg-330,deg-331,deg-332,deg-333,deg-334,deg-335,deg-336,deg-337,deg-338,deg-339,deg-340,deg-341,deg-342,deg-343,deg-344,deg-345,deg-346,deg-347,deg-348,deg-349,deg-350,deg-351,deg-352,deg-353,deg-354,deg-355,deg-356,deg-357,deg-358,deg-359,deg-360,deg-361,deg-362,deg-363,deg-364,deg-365,deg-366,deg-367,deg-368,deg-369,deg-370,deg-371,deg-372,deg-373,deg-374,deg-375,deg-376,deg-377,deg-378,deg-379,deg-380,deg-381,deg-382,deg-383,deg-384,deg-385,deg-386,deg-387,deg-388,deg-389,deg-390,deg-391,deg-392,deg-393,deg-394,deg-395,deg-396,deg-397,deg-398,deg-399,deg-400,deg-401,deg-402,deg-403,deg-404,deg-405,deg-406,deg-407,deg-408,deg-409,deg-410,deg-411,deg-412,deg-413,deg-414,deg-415,deg-416,deg-417,deg-418,deg-419,deg-420,deg-421,deg-422,deg-423,deg-424,deg-425,deg-426,deg-427,deg-428,deg-429,deg-430,deg-431,deg-432,deg-433,deg-434,deg-435,deg-436,deg-437,deg-438,deg-439,deg-440,deg-441,deg-442,deg-443,deg-444,deg-445,deg-446,deg-447,deg-448,deg-449,deg-450,deg-451,deg-452,deg-453,deg-454,deg-455,deg-456,deg-457,deg-458,deg-459,deg-460,deg-461,deg-462,deg-463,deg-464,deg-465,deg-466,deg-467,deg-468,deg-469,deg-470,deg-471,deg-472,deg-473,deg-474,deg-475,deg-476,deg-477,deg-478,deg-479,deg-480,deg-481,deg-482,deg-483,deg-484,deg-485,deg-486,deg-487,deg-488,deg-489,deg-490,deg-491,deg-492,deg-493,deg-494,deg-495,deg-496,deg-497,deg-498,deg-499,deg-500,deg-501,deg-502,deg-503,deg-504,deg-505,deg-506,deg-507,deg-508,deg-509,deg-510,deg-511,deg-512\n';
  var rcv = '';
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on('data', (chunk) => {
    if (chunk.length >= 6000 || chunk.length <= 4000) {
      rcv += chunk;
      console.log('got %d characters of string data', rcv.length);
    } else {
      console.log('data from the client');
      var writable = fs.createWriteStream(__dirname +'/public/upload/result.txt');
      writable.end(chunk, 'utf8', function() {
        concat([__dirname +'/public/upload/model.txt', __dirname +'/public/upload/result.txt'], __dirname +'/public/upload/resultfinal.txt');
        console.log('got %d characters of string data', chunk.length);
      });
      writable.on('finish', () => {
        fs.rename(__dirname +'/public/upload/resultfinal.txt', __dirname +'/public/upload/resultfinal.csv');
        console.log('All writes are now complete.');
      });
    }
    var ecrit = fs.createWriteStream(__dirname +'/public/upload/resultfft2d.csv');
    ecrit.write(model + rcv);
  });

  app.get('/senddata', function(request, response) {
    c.write('/uploadxxx');
    var stream = fs.createReadStream(__dirname +'/public/upload/data_complex.csv');
    stream.pipe(c, { end: false });
    stream.on('end', () => {
      console.log('No more data..');
      stream.unpipe();
    });
    return response.render('hometrue.ejs');
  });

  app.post('/fft', function(request, response) {
    var lastdegree = request.body.lastdegree;
    var degselect = request.body.degree;
    if (degselect <= 9) {
      console.log(degselect);
      c.write('/fftxxx00'+ degselect);
      return response.render('fft1danim.ejs', {degree: degselect, lastdegree: lastdegree});
    } else if (degselect < 100) {
      console.log(degselect);
      c.write('/fftxxx0'+degselect);
      return response.render('fft1danim.ejs', {degree: degselect, lastdegree: lastdegree});
    } else if (degselect < 513){
      console.log(degselect);
      c.write('/fftxxx'+degselect);
      return response.render('fft1danim.ejs', {degree: degselect, lastdegree: lastdegree});
    }
  });

  app.post('/fft2dvisu2d', function(request, response) {
    c.write('/2d');
    rcv = '';
    return response.render('fft2dvisu2d.ejs');
  });
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});

//NODE JS SERVER ---------------------------------------------------------------------------------------------------------------------------------
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboy());

//UPLOAD FILES
app.post('/fileupload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      if(mimetype != 'text/csv'){
        file.resume();
        return res.redirect('/datauploaderr');
      }
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream(__dirname + '/public/upload/data_complex.csv');
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('/senddata');
        });
    });
});

//GET Home
app.get('/home', function(req, res) {
    res.render('home.ejs');
});
//GET Home upload true
app.get('/hometrue', function(req, res) {
    res.render('hometrue.ejs');
});
//GET fft1d
app.get('/fft1d', function(req, res) {
    res.render('fft1d.ejs');
});
//GET fft2d visual 2d
app.get('/fft2dvisu2d', function(req, res) {
    res.render('fft2dvisu2d.ejs');
});
//GET fft2d visual 3d
app.get('/fft2dvisu3d', function(req, res) {
    res.render('fft2dvisu3d.ejs');
});
//GET upload
app.get('/dataupload', function(req, res) {
    res.render('upload.ejs');
});
//GET upload erreur
app.get('/datauploaderr', function(req, res) {
    res.render('uploaderr.ejs');
});
//USE POST AND DYNAMIC INDEXANIM
app.post('/post', function(request, response) {
  var lastdegree = request.body.lastdegree;
  var degree = request.body.degree;
  response.render('fft1danim.ejs', {degree: degree, lastdegree: lastdegree});
});

app.listen(8080, '0.0.0.0');
