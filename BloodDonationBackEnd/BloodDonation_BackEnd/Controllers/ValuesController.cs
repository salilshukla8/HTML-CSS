using BloodDonation_BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace BloodDonation_BackEnd.Controllers
{
    public class ValuesController : ApiController
    {

        [Route("api/Values/Login")]
        [HttpPost]
        public Response Login(User user)
        {
            Response response = new Response();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            UserMaster loggedUser =
                db.UserMasters.FirstOrDefault(u => u.UserEmail == user.UserEmail
                && u.Password == user.Password
                && u.Type == user.Type);
            if (loggedUser != null)
            {
                response.responseCode = 200;
                response.responseMessage = "Logged In";
                response.user = loggedUser;
            }
            else
            {
                response.responseCode = 100;
                response.responseMessage = "Login failed";
                response.user = null;
            }
            return response; // JsonConvert.SerializeObject(response);
        }

        [Route("api/Values/DonorRegistration")]
        [HttpPost]
        public DonorRegistrationResponse DonorRegistration(User donor)
        {
            DonorRegistrationResponse response = new DonorRegistrationResponse();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            try
            {
                UserMaster user = new UserMaster();
                user.UserName = donor.UserName;
                user.UserAddress = donor.UserAddress;
                user.UserEmail = donor.UserEmail;
                user.UserPhone = donor.UserPhone;
                user.Type = donor.Type;
                user.Password = donor.Password;
                user.CreatedDate = DateTime.Now;
                if (donor != null)
                {
                    db.UserMasters.Add(user);
                    db.SaveChanges();
                    response.responseCode = 200;
                    response.responseMessage = "Registration successful";
                }
                else
                {
                    response.responseCode = 100;
                    response.responseMessage = "Registration failed";
                }
            }
            catch (Exception ex)
            {
                response.responseCode = 100;
                response.responseMessage = "Registration failed" + ex.Message;
            }
            return response; // JsonConvert.SerializeObject(response);
        }

        [Route("api/Values/SeekerRegistration")]
        [HttpPost]
        public SeekerRegistrationResponse SeekerRegistration([FromBody] User seeker)
        {
            SeekerRegistrationResponse response = new SeekerRegistrationResponse();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            try
            {
                UserMaster user = new UserMaster();
                user.UserName = seeker.UserName;
                user.UserAddress = seeker.UserAddress;
                user.UserEmail = seeker.UserEmail;
                user.UserPhone = seeker.UserPhone;
                user.Type = seeker.Type;
                user.Password = seeker.Password;
                user.CreatedDate = DateTime.Now;
                if (seeker != null)
                {
                    db.UserMasters.Add(user);
                    db.SaveChanges();
                    response.responseCode = 200;
                    response.responseMessage = "Registration successful";
                }
                else
                {
                    response.responseCode = 100;
                    response.responseMessage = "Registration failed";
                }
            }
            catch (Exception ex)
            {
                response.responseCode = 100;
                response.responseMessage = "Registration failed" + ex.Message;
            }
            return response;
        }

        [Route("api/Values/HospitalRegistration")]
        [HttpPost]
        public HospitalRegisterationResponse HospitalRegistration([FromBody] User hospital)
        {
            HospitalRegisterationResponse response = new HospitalRegisterationResponse();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            try
            {
                UserMaster user = new UserMaster();
                user.UserName = hospital.UserName;
                user.UserAddress = hospital.UserAddress;
                user.UserEmail = hospital.UserEmail;
                user.UserPhone = hospital.UserPhone;
                user.Type = hospital.Type;
                user.Password = hospital.Password;
                user.CreatedDate = DateTime.Now;
                if (hospital != null)
                {
                    db.UserMasters.Add(user);
                    db.SaveChanges();
                    response.responseCode = 200;
                    response.responseMessage = "Registration successful";
                }
                else
                {
                    response.responseCode = 100;
                    response.responseMessage = "Registration failed";
                }
            }
            catch (Exception ex)
            {
                response.responseCode = 100;
                response.responseMessage = "Registration failed" + ex.Message;
            }
            return response;
        }

        [Route("api/Values/NewRequest")]
        [HttpPost]
        public DonorRegistrationResponse NewRequest(RequestModel requestModel)
        {
            DonorRegistrationResponse response = new DonorRegistrationResponse();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            try
            {
                Request request = new Request();


                if (request != null)
                {
                    if (requestModel.RequestStatus == "ACCEPTED")
                    {
                        request.ID = requestModel.ID;
                        request.RequestStatus = requestModel.RequestStatus;
                        db.Requests.Add(request);
                        db.Entry(request).State = EntityState.Modified;
                        db.SaveChanges();
                        response.responseCode = 200;
                        response.responseMessage = "Request has been updated successful";
                    }
                    else
                    {
                        request.RequestContent = requestModel.RequestContent;
                        request.RequestType = requestModel.RequestType;
                        request.RequestFrom = requestModel.RequestFrom;
                        request.RequestStatus = requestModel.RequestStatus;
                        request.InsertedON = DateTime.Now;
                        db.Requests.Add(request);
                        db.SaveChanges();
                        response.responseCode = 200;
                        response.responseMessage = "Request has been added successful";
                    }
                }
                else
                {
                    response.responseCode = 100;
                    response.responseMessage = "Request can not be saved";
                }
            }
            catch (Exception ex)
            {
                response.responseCode = 100;
                response.responseMessage = "Request can not be saved" + ex.Message;
            }
            return response;
        }

        [Route("api/Values/AllRequest")]
        [HttpPost]
        public Response AllRequest(RequestModel requestModel)
        {
            Response response = new Response();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            List<Request> lstRequest = new List<Request>();
            if (requestModel.RequestType == "All")
            {
                lstRequest = db.Requests.ToList();
            }
            else
            {
                lstRequest = db.Requests
                    .Where(x => x.RequestFrom == requestModel.RequestFrom
                    && x.RequestType == requestModel.RequestType).ToList();
            }
            if (lstRequest != null)
            {
                response.responseCode = 200;
                response.responseMessage = "Data fetched";
                response.lstRequest = lstRequest;
            }
            else
            {
                response.responseCode = 100;
                response.responseMessage = "No data found";
                response.lstRequest = null;
            }
            return response; // JsonConvert.SerializeObject(response);
        }

        [Route("api/Values/DonorList")]
        [HttpPost]
        public Response DonorList(User user)
        {
            Response response = new Response();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            List<UserMaster> lstDonors = new List<UserMaster>();
            if (user.UserName == null || user.UserName == "")
            {
                lstDonors = db.UserMasters
                    .Where(x => x.Type == user.Type).ToList();
            }
            else
            {
                lstDonors = db.UserMasters
                    .Where(x => x.Type == user.Type && x.UserName == user.UserName).ToList();
            }
            if (lstDonors != null)
            {
                response.responseCode = 200;
                response.responseMessage = "Data fetched";
                response.lstDonors = lstDonors;
            }
            else
            {
                response.responseCode = 100;
                response.responseMessage = "No data found";
                response.lstDonors = null;
            }
            return response; // JsonConvert.SerializeObject(response);
        }

        [Route("api/Values/BloodBankList")]
        [HttpPost]
        public Response BloodBankList(BloodBank bloodBank)
        {
            Response response = new Response();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            List<BloodBank> lstBloodBanks = new List<BloodBank>();
            if (bloodBank == null || bloodBank.Name == null || bloodBank.Name == "")
            {
                lstBloodBanks = db.BloodBanks.ToList();
            }
            else
            {
                lstBloodBanks = db.BloodBanks.Where(x => x.Name == bloodBank.Name).ToList();
            }
            if (lstBloodBanks != null)
            {
                response.responseCode = 200;
                response.responseMessage = "Data fetched";
                response.lstBloodBanks = lstBloodBanks;
            }
            else
            {
                response.responseCode = 100;
                response.responseMessage = "No data found";
                response.lstBloodBanks = null;
            }
            return response; // JsonConvert.SerializeObject(response);
        }

        [Route("api/Values/AddCampaign")]
        [HttpPost]
        public DonorRegistrationResponse AddCampaign(CampaignModel campaignModel)
        {
            DonorRegistrationResponse response = new DonorRegistrationResponse();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            try
            {
                Campaign campaign = new Campaign();
                campaign.Name = campaignModel.Name;
                campaign.Location = campaignModel.Location;
                campaign.CampaignDate = campaignModel.CampaignDate;
                campaign.InsertedON = DateTime.Now;

                if (campaign != null)
                {
                    db.Campaigns.Add(campaign);
                    db.SaveChanges();
                    response.responseCode = 200;
                    response.responseMessage = "Campaign has been added successful";
                }
                else
                {
                    response.responseCode = 100;
                    response.responseMessage = "Campaign can not be saved";
                }
            }
            catch (Exception ex)
            {
                response.responseCode = 100;
                response.responseMessage = "Campaign can not be saved" + ex.Message;
            }
            return response;
        }

        [Route("api/Values/AddStock")]
        [HttpPost]
        public DonorRegistrationResponse AddStock(StockModel stockModel)
        {
            DonorRegistrationResponse response = new DonorRegistrationResponse();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            try
            {
                Stock stock = new Stock();
                stock.BloodGroup = stockModel.BloodGroup;
                stock.Unit = stockModel.Unit;
                stock.InsertedON = DateTime.Now;

                if (stock != null)
                {
                    db.Stocks.Add(stock);
                    db.SaveChanges();
                    response.responseCode = 200;
                    response.responseMessage = "Stock has been added successful";
                }
                else
                {
                    response.responseCode = 100;
                    response.responseMessage = "Stock can not be saved";
                }
            }
            catch (Exception ex)
            {
                response.responseCode = 100;
                response.responseMessage = "Stock can not be saved" + ex.Message;
            }
            return response;
        }

        [Route("api/Values/AllStock")]
        [HttpGet]
        public Response AllStock()
        {
            Response response = new Response();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            try
            {
                List<Stock> lstStock = db.Stocks.ToList();
                if (lstStock != null)
                {
                    response.responseCode = 200;
                    response.responseMessage = "Data found";
                    response.lstStock = lstStock;
                }
                else
                {
                    response.responseCode = 100;
                    response.responseMessage = "No data";
                    response.lstStock = null;
                }
            }
            catch (Exception ex)
            {
                response.responseCode = 100;
                response.responseMessage = "No data" + ex.Message;
            }
            return response;
        }

        [Route("api/Values/AllCampaign")]
        [HttpGet]
        public Response AllCampaign()
        {
            Response response = new Response();
            BloodDonationManagementEntities db = new BloodDonationManagementEntities();
            try
            {
                List<Campaign> lstCampaign = db.Campaigns.ToList();
                if (lstCampaign != null)
                {
                    response.responseCode = 200;
                    response.responseMessage = "Data found";
                    response.lstCampaign = lstCampaign;
                }
                else
                {
                    response.responseCode = 100;
                    response.responseMessage = "No data";
                    response.lstStock = null;
                }
            }
            catch (Exception ex)
            {
                response.responseCode = 100;
                response.responseMessage = "No data" + ex.Message;
            }
            return response;
        }
    }
}
