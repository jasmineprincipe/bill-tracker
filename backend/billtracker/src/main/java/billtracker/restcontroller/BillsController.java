//
//  package billtracker.restcontroller;
//  
//  import java.util.List;
//  
//  import javax.ws.rs.Consumes; import javax.ws.rs.DELETE; import
//  javax.ws.rs.GET; import javax.ws.rs.POST; import javax.ws.rs.PUT; import
//  javax.ws.rs.Path; import javax.ws.rs.PathParam; import javax.ws.rs.Produces;
//  import javax.ws.rs.QueryParam; import javax.ws.rs.WebApplicationException;
//  import javax.ws.rs.core.MediaType; import javax.ws.rs.core.Response;
//  
//  import org.apache.commons.lang3.StringUtils;
//  
//  import billtracker.domain.Bill; import billtracker.domain.Merchant; import
//  billtracker.service.BillService; import billtracker.service.BillServiceImpl;
//  
//  @Path("/bills") public class BillsController {
//  
//  private BillService billService;
//  
//  public BillsController() { this.billService = new BillServiceImpl(); }
//  
//  @GET
//  
//  @Produces(MediaType.APPLICATION_JSON) public List<Bill> getBills(
//  
//  @QueryParam("merchantName") Merchant merchantName,
//  
//  @QueryParam("serialNumber") String serialNumber) {
//  
//  try { List<Bill> bills;
//  
//  if (StringUtils.isAllBlank(merchantName.toString(), serialNumber)) { bills =
//  billService.findAll(); } else { bills =
//  billService.findByMerchant(merchantName); }
//  
//  return bills;
//  
//  } catch (Exception e) { throw new WebApplicationException(e); }
//  
//  }
//  
//  @GET
//  
//  @Path("{bill_id}")
//  
//  @Produces(MediaType.APPLICATION_JSON) public Bill
//  getBill(@PathParam("bill_id") String billId) {
//  
//  try { Long longId = Long.parseLong(billId); Bill bill =
//  billService.find(longId); return bill; } catch (Exception e) { throw new
//  WebApplicationException(e); } }
//  
//  @POST
//  
//  @Consumes(MediaType.APPLICATION_JSON) public Response addBill(Bill bill) {
//  
//  try { billService.add(bill); String result = "Bill saved : " +
//  bill.getMerchantName() + " : " + bill.getAmount(); return
//  Response.status(201).entity(result).build(); } catch (Exception e) { throw
//  new WebApplicationException(e); }
//  
//  }
//  
//  @PUT
//  
//  @Consumes(MediaType.APPLICATION_JSON) public Response updateBill(Bill bill) {
//  
//  try { billService.upsert(bill); String result = "Bill updated : " +
//  bill.getMerchantName() + " : " + bill.getAmount(); return
//  Response.status(200).entity(result).build(); } catch (Exception e) { throw
//  new WebApplicationException(e); }
//  
//  }
//  
//  @DELETE
//  
//  @Path("{bill_id}") public Response deleteBill(@PathParam("bill_id") String
//  billId) {
//  
//  try { Long longId = Long.parseLong(billId); billService.delete(longId);
//  String result = "Bill deleted"; return
//  Response.status(200).entity(result).build(); } catch (Exception e) { throw
//  new WebApplicationException(e); } } }
// 