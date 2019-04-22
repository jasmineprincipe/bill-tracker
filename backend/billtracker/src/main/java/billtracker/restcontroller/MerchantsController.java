package billtracker.restcontroller;

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

import billtracker.domain.Merchant;
import billtracker.service.MerchantService;
import billtracker.service.MerchantServiceImpl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Path("/merchants")
public class MerchantsController {

	private MerchantService merchantService;

	public MerchantsController() {
		this.merchantService = new MerchantServiceImpl();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Merchant> getMerchants(
			@QueryParam("merchantName") String merchantName, 
			@QueryParam("merchantDescription") String merchantDescription) {

		try {
			List<Merchant> merchants;
			
			if (StringUtils.isAllBlank(merchantName, merchantDescription)) {
				merchants = merchantService.findAll();
			} else {
				merchants = merchantService.findByName(merchantName);
			}
						
			return merchants;
			
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Merchant getMerchant(@PathParam("id") String id) {

		try {
			Long longId = Long.parseLong(id);
			Merchant merchant = merchantService.find(longId);
			return merchant;
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@POST
	@JsonIgnoreProperties
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addMerchant(Merchant merchant) {
		
		try {
			merchantService.add(merchant);
			String result = "Merchant saved : " + merchant.getMerchantName();
			return Response.status(201).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@PUT
	@JsonIgnoreProperties
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateMerchant(Merchant merchant) {

		try {
			merchantService.upsert(merchant);
			String result = "Merchant updated : " + merchant.getMerchantName() + " " + merchant.getMerchantDescription();
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@DELETE
	@JsonIgnoreProperties
	@Path("{id}")
	public Response deleteMerchant(@PathParam("id") String id) {

		try {
			Long longId = Long.parseLong(id);
			merchantService.delete(longId);
			String result = "Merchant deleted";
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}
}
