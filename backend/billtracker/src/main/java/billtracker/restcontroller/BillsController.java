package billtracker.restcontroller;

import java.math.BigDecimal;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.lang3.StringUtils;

import billtracker.domain.Bill;
import billtracker.service.BillService;
import billtracker.service.BillServiceImpl;

@Path("/bills")
public class BillsController {

	private BillService billService;

	public BillsController() {
		this.billService = new BillServiceImpl();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Bill> getBills(
			@QueryParam("merchantName") String merchantName,
			@QueryParam("serialNumber") String serialNumber,
			@QueryParam("dueDate") String dueDate){
			try {
				List<Bill> bills;
	
//				if (StringUtils.isAllBlank(merchantName, serialNumber)) {
//					bills = billService.findAllBills();
//				} else {
//					bills = billService.findByMerchant(merchantName);
//				}
			
			if(StringUtils.isNotBlank(merchantName)) {
				bills = billService.findByMerchant(merchantName);
			} else if (StringUtils.isBlank(merchantName) && StringUtils.isNotBlank(dueDate)) {
				bills = billService.findByMonth(dueDate);
			} else {
				bills = billService.findAllBills();
			}
		
			return bills;

		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@GET
	@Path("{bill_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Bill getBill(@PathParam("bill_id") String billId) {

		try {
			Long longId = Long.parseLong(billId);
			Bill bill = billService.findBill(longId);
			return bill;
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}
	
//	@GET
//	@Produces(MediaType.APPLICATION_JSON)
//	public List<Bill> getCurrentBills(
//			@QueryParam("dueDate") String dueDate) {
//
//		try {
//			List<Bill> currentbills;
//
//			if (StringUtils.isAllBlank(dueDate)) {
//				currentbills = billService.findAllBills();
//			} else {
//				currentbills = billService.findByMonth(dueDate);
//			}
//			
//			return currentbills;
//
//		} catch (Exception e) {
//			throw new WebApplicationException(e);
//		}
//	}
//	
//	@GET
//	@Path("/current/{bill_id}")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Bill getCurrentBill(@PathParam("bill_id") String billId) {
//
//		try {
//			Long longId = Long.parseLong(billId);
//			Bill bill = billService.findBill(longId);
//			return bill;
//		} catch (Exception e) {
//			throw new WebApplicationException(e);
//		}
//	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addBill(Bill bill) {

		try {
			billService.add(bill);
			String result = "Bill saved : " + bill.getMerchantName() + " : " + bill.getAmount();
			return Response.status(201).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateBill(Bill bill) {

		try {
			billService.upsert(bill);
			String result = "Bill updated : " + bill.getMerchantName() + " : " + bill.getAmount();
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@DELETE
	@Path("{bill_id}")
	public Response deleteBill(@PathParam("bill_id") String billId) {

		try {
			Long longId = Long.parseLong(billId);
			billService.deleteBill(longId);
			String result = "Bill deleted";
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}
}
